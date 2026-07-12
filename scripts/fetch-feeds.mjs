// scripts/fetch-feeds.mjs
// Railway의 fetcher 서비스가 Cron Schedule(0 */3 * * *)로 3시간마다 실행한다.
// 사용자가 준 프로토타입(feed-aggregator.mjs)의 구조를 기반으로,
// 결과를 feeds.json 대신 Postgres(Prisma)에 저장하도록 확장했다.
// web/fetcher가 Railway에서 별도 컨테이너로 떠서 파일시스템을 공유하지 않기 때문.
import Parser from "rss-parser";
import { PrismaClient } from "@prisma/client";
import Anthropic from "@anthropic-ai/sdk";
import { sources } from "./sources.mjs";

// 일부 피드는 기본 Accept 헤더 없이는 406을 반환하므로 명시해준다.
const parser = new Parser({
  headers: {
    Accept: "application/rss+xml, application/xml, text/xml, */*",
  },
});
const prisma = new PrismaClient();
const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

// 번역/분류 모두 저비용 배치 처리에 적합한 Haiku를 사용한다.
const HAIKU_MODEL = "claude-haiku-4-5";
const TRANSLATE_BATCH_SIZE = 20;
const CLASSIFY_BATCH_SIZE = 30;
const CATEGORIES = ["마케팅", "제품", "투자", "정책"];

const TRANSLATE_SCHEMA = {
  type: "object",
  properties: {
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          titleKo: { type: "string" },
          summaryKo: { type: "string" },
        },
        required: ["id", "titleKo", "summaryKo"],
        additionalProperties: false,
      },
    },
  },
  required: ["items"],
  additionalProperties: false,
};

const CLASSIFY_SCHEMA = {
  type: "object",
  properties: {
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          category: { type: "string", enum: CATEGORIES },
          aiSummary: { type: "string", description: "한국어 한 문장 요약" },
        },
        required: ["id", "category", "aiSummary"],
        additionalProperties: false,
      },
    },
  },
  required: ["items"],
  additionalProperties: false,
};

// 영문 기사 제목/요약을 한국어로 번역·요약. id로 매칭해 순서 꼬임을 방지하고,
// output_config.format으로 스키마를 강제해 파싱 실패 가능성을 없앤다.
async function translateChunk(items) {
  if (!anthropic || items.length === 0) return new Map();

  const prompt = `다음은 AI/마케팅 분야 해외 매체 기사의 제목과 요약입니다. 각 항목을 자연스러운 한국어로 번역하고, 요약은 2문장 이내로 간결하게 다시 정리해주세요.

입력:
${JSON.stringify(items, null, 2)}`;

  try {
    const res = await anthropic.messages.create({
      model: HAIKU_MODEL,
      max_tokens: 4096,
      output_config: { format: { type: "json_schema", schema: TRANSLATE_SCHEMA } },
      messages: [{ role: "user", content: prompt }],
    });

    const text = res.content.find((block) => block.type === "text")?.text ?? "{}";
    const parsed = JSON.parse(text);

    const map = new Map();
    for (const entry of parsed.items ?? []) {
      map.set(entry.id, { titleKo: entry.titleKo, summaryKo: entry.summaryKo });
    }
    return map;
  } catch (err) {
    console.error(`  ⚠️ 번역 실패: ${err.message}`);
    return new Map();
  }
}

async function translateAll(newItems) {
  const results = new Map();
  for (let i = 0; i < newItems.length; i += TRANSLATE_BATCH_SIZE) {
    const chunk = newItems.slice(i, i + TRANSLATE_BATCH_SIZE);
    const payload = chunk.map((item, idx) => ({
      id: i + idx,
      title: item.title,
      summary: item.summary,
    }));
    const translated = await translateChunk(payload);
    for (const [id, value] of translated) results.set(id, value);
  }
  return results;
}

// 국내/해외 모든 기사를 4개 카테고리로 분류하고 한 줄 요약을 생성한다.
// 영문 기사는 번역이 끝난 뒤 호출되므로 titleKo/summaryKo(번역본)를 우선 사용한다.
async function classifyChunk(items) {
  if (!anthropic || items.length === 0) return new Map();

  const prompt = `다음은 AI/마케팅 분야 뉴스 기사 목록입니다. 각 기사를 "마케팅"(마케팅 전략·캠페인·마테크 도구), "제품"(AI 제품·모델 출시), "투자"(펀딩·인수), "정책"(규제·정책) 중 하나로 분류하고, 핵심 내용을 한국어 한 문장으로 요약해주세요.

입력:
${JSON.stringify(items, null, 2)}`;

  try {
    const res = await anthropic.messages.create({
      model: HAIKU_MODEL,
      max_tokens: 4096,
      output_config: { format: { type: "json_schema", schema: CLASSIFY_SCHEMA } },
      messages: [{ role: "user", content: prompt }],
    });

    const text = res.content.find((block) => block.type === "text")?.text ?? "{}";
    const parsed = JSON.parse(text);

    const map = new Map();
    for (const entry of parsed.items ?? []) {
      map.set(entry.id, { category: entry.category, aiSummary: entry.aiSummary });
    }
    return map;
  } catch (err) {
    console.error(`  ⚠️ 분류 실패: ${err.message}`);
    return new Map();
  }
}

async function classifyAll(newItems) {
  const results = new Map();
  for (let i = 0; i < newItems.length; i += CLASSIFY_BATCH_SIZE) {
    const chunk = newItems.slice(i, i + CLASSIFY_BATCH_SIZE);
    const payload = chunk.map((item, idx) => ({
      id: i + idx,
      title: item.titleKo || item.title,
      summary: item.summaryKo || item.summary,
    }));
    const classified = await classifyChunk(payload);
    for (const [id, value] of classified) results.set(id, value);
  }
  return results;
}

async function fetchSource(feed) {
  let data;
  try {
    data = await parser.parseURL(feed.feedUrl);
  } catch (err) {
    console.error(`❌ ${feed.name}: ${err.message}`);
    return { newCount: 0, failed: true };
  }

  const source = await prisma.source.upsert({
    where: { slug: feed.slug },
    update: {
      name: feed.name,
      feedUrl: feed.feedUrl,
      siteUrl: feed.siteUrl,
      category: feed.category,
      language: feed.language,
    },
    create: feed,
  });

  const newItems = [];
  for (const item of data.items) {
    const guid = item.guid || item.link;
    if (!guid || !item.link) continue;

    const exists = await prisma.article.findUnique({
      where: { sourceId_guid: { sourceId: source.id, guid } },
    });
    if (exists) continue;

    newItems.push({
      sourceId: source.id,
      guid,
      title: item.title ?? "(제목 없음)",
      summary: item.contentSnippet || item.content || "",
      link: item.link,
      publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
    });
  }

  // 같은 피드 응답 안에 동일 guid가 중복 등장하는 경우를 대비해 한 번 더 정리한다.
  const deduped = [...new Map(newItems.map((a) => [a.guid, a])).values()];

  if (deduped.length === 0) {
    console.log(`– ${feed.name}: 신규 기사 없음`);
    return { newCount: 0, failed: false };
  }

  if (feed.language === "en") {
    const translations = await translateAll(deduped);
    deduped.forEach((item, idx) => {
      const t = translations.get(idx);
      if (t) {
        item.titleKo = t.titleKo;
        item.summaryKo = t.summaryKo;
      }
    });
  }

  const classifications = await classifyAll(deduped);
  deduped.forEach((item, idx) => {
    const c = classifications.get(idx);
    if (c) {
      item.category = c.category;
      item.aiSummary = c.aiSummary;
    }
  });

  await prisma.article.createMany({ data: deduped });
  console.log(`✅ ${feed.name}: ${deduped.length}개 신규 기사`);
  return { newCount: deduped.length, failed: false };
}

async function aggregateFeeds() {
  let totalNew = 0;
  let failedFeeds = 0;

  for (const feed of sources) {
    const { newCount, failed } = await fetchSource(feed);
    totalNew += newCount;
    if (failed) failedFeeds++;
  }

  console.log(`\n총 ${totalNew}개 신규 기사 수집, 실패 피드 ${failedFeeds}/${sources.length}개`);
}

aggregateFeeds()
  .catch((err) => {
    console.error("수집 작업 실패:", err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

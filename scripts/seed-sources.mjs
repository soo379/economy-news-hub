import { PrismaClient } from "@prisma/client";
import { sources } from "./sources.mjs";

const prisma = new PrismaClient();

// 경제 뉴스 앱 → AI 마케팅 뉴스 앱으로 전환하면서 소스 목록이 통째로 바뀌었다.
// sources.mjs에 더 이상 없는 옛 소스(hankyung, mk, 연준 피드 등)는 기사와 함께 정리한다.
async function pruneRemovedSources() {
  const keepSlugs = sources.map((s) => s.slug);
  const stale = await prisma.source.findMany({
    where: { slug: { notIn: keepSlugs } },
  });
  if (stale.length === 0) return;

  const staleIds = stale.map((s) => s.id);
  const { count } = await prisma.article.deleteMany({ where: { sourceId: { in: staleIds } } });
  await prisma.source.deleteMany({ where: { id: { in: staleIds } } });
  console.log(`🗑 이전 소스 ${stale.length}개, 기사 ${count}개 정리: ${stale.map((s) => s.name).join(", ")}`);
}

async function main() {
  await pruneRemovedSources();
  for (const s of sources) {
    await prisma.source.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
    console.log(`✔ ${s.name}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

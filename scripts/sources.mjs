// 수집 대상 RSS 소스 목록 — seed-sources.mjs, fetch-feeds.mjs 공용
// ai-marketing-rss-feeds.md 기준으로 작성했으나, 문서에 있던 URL 중 상당수는
// 실제로는 존재하지 않는 도메인/경로였다(Marketing AI, Petal, Anthropic 공식 feed 등).
// 아래 목록은 모두 실제 fetch로 200 응답 + RSS 포맷임을 확인한 피드만 포함한다.
export const sources = [
  // --- 한국 AI/테크 뉴스 (domestic) ---
  {
    slug: "aitimes",
    name: "AI타임스",
    category: "domestic",
    language: "ko",
    feedUrl: "https://www.aitimes.com/rss/allArticle.xml",
    siteUrl: "https://www.aitimes.com",
  },
  {
    slug: "geeknews",
    name: "GeekNews",
    category: "domestic",
    language: "ko",
    feedUrl: "https://feeds.feedburner.com/geeknews-feed",
    siteUrl: "https://news.hada.io",
  },
  {
    slug: "zdnet-korea",
    name: "ZDNet Korea",
    category: "domestic",
    language: "ko",
    feedUrl: "https://feeds.feedburner.com/zdkorea",
    siteUrl: "https://zdnet.co.kr",
  },
  {
    slug: "byline-network",
    name: "Byline Network",
    category: "domestic",
    language: "ko",
    feedUrl: "https://byline.network/feed/",
    siteUrl: "https://byline.network",
  },

  // --- AI/LLM 뉴스 (international) ---
  {
    slug: "hacker-news",
    name: "Hacker News",
    category: "international",
    language: "en",
    feedUrl: "https://news.ycombinator.com/rss",
    siteUrl: "https://news.ycombinator.com",
  },
  {
    slug: "the-verge",
    name: "The Verge",
    category: "international",
    language: "en",
    feedUrl: "https://www.theverge.com/rss/index.xml",
    siteUrl: "https://www.theverge.com",
  },
  {
    slug: "mit-tech-review",
    name: "MIT Technology Review",
    category: "international",
    language: "en",
    feedUrl: "https://www.technologyreview.com/feed/",
    siteUrl: "https://www.technologyreview.com",
  },

  // --- AI 비즈니스 & 스타트업 (international) ---
  {
    slug: "techcrunch",
    name: "TechCrunch",
    category: "international",
    language: "en",
    feedUrl: "https://techcrunch.com/feed/",
    siteUrl: "https://techcrunch.com",
  },
  {
    slug: "venturebeat",
    name: "VentureBeat",
    category: "international",
    language: "en",
    feedUrl: "https://venturebeat.com/feed/",
    siteUrl: "https://venturebeat.com",
  },
  {
    slug: "stratechery",
    name: "Stratechery",
    category: "international",
    language: "en",
    feedUrl: "https://stratechery.com/feed/",
    siteUrl: "https://stratechery.com",
  },

  // --- AI 제품 공식 업데이트 (international) ---
  {
    slug: "openai-news",
    name: "OpenAI News",
    category: "international",
    language: "en",
    feedUrl: "https://openai.com/news/rss.xml",
    siteUrl: "https://openai.com/news/",
  },
  {
    slug: "google-ai-blog",
    name: "Google AI Blog",
    category: "international",
    language: "en",
    feedUrl: "https://blog.google/technology/ai/rss/",
    siteUrl: "https://blog.google/technology/ai/",
  },

  // --- 마테크 / 디지털 마케팅 (international) ---
  {
    slug: "search-engine-journal",
    name: "Search Engine Journal",
    category: "international",
    language: "en",
    feedUrl: "https://www.searchenginejournal.com/feed/",
    siteUrl: "https://www.searchenginejournal.com",
  },
  {
    slug: "search-engine-land",
    name: "Search Engine Land",
    category: "international",
    language: "en",
    feedUrl: "https://searchengineland.com/feed",
    siteUrl: "https://searchengineland.com",
  },
  {
    slug: "martech",
    name: "MarTech",
    category: "international",
    language: "en",
    feedUrl: "https://martech.org/feed/",
    siteUrl: "https://martech.org",
  },
  {
    slug: "marketing-dive",
    name: "Marketing Dive",
    category: "international",
    language: "en",
    feedUrl: "https://www.marketingdive.com/feeds/news/",
    siteUrl: "https://www.marketingdive.com",
  },
  {
    slug: "ahrefs-blog",
    name: "Ahrefs Blog",
    category: "international",
    language: "en",
    feedUrl: "https://ahrefs.com/blog/feed/",
    siteUrl: "https://ahrefs.com/blog",
  },

  // --- 콘텐츠 & 소셜 마케팅 (international) ---
  {
    slug: "social-media-examiner",
    name: "Social Media Examiner",
    category: "international",
    language: "en",
    feedUrl: "https://www.socialmediaexaminer.com/feed/",
    siteUrl: "https://www.socialmediaexaminer.com",
  },
  {
    slug: "youtube-blog",
    name: "YouTube Blog",
    category: "international",
    language: "en",
    feedUrl: "https://blog.youtube/rss/",
    siteUrl: "https://blog.youtube",
  },
];

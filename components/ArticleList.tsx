import ArticleCard from "./ArticleCard";

type ArticleListItem = {
  id: string;
  title: string;
  titleKo: string | null;
  summary: string | null;
  summaryKo: string | null;
  aiSummary: string | null;
  category: string | null;
  link: string;
  publishedAt: Date;
  source: { name: string; language: string };
};

export default function ArticleList({ articles }: { articles: ArticleListItem[] }) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-stone-300 py-16 text-center dark:border-stone-700">
        <span className="text-2xl">🗞️</span>
        <p className="text-sm text-stone-500">
          조건에 맞는 기사가 아직 없습니다. 잠시 후 다시 확인해주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

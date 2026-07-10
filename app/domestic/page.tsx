import { Suspense } from "react";
import { getArticles, getSources, getLastUpdated } from "@/lib/queries";
import ArticleList from "@/components/ArticleList";
import Sidebar from "@/components/Sidebar";
import LastUpdated from "@/components/LastUpdated";
import CategoryFilter from "@/components/CategoryFilter";

export const revalidate = 0;

export default async function DomesticPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string; cat?: string }>;
}) {
  const { source, cat } = await searchParams;

  const [articles, sources, lastUpdated] = await Promise.all([
    getArticles({ category: "domestic", sourceSlug: source, articleCategory: cat, take: 60 }),
    getSources("domestic"),
    getLastUpdated(),
  ]);

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <Suspense fallback={null}>
        <Sidebar sources={sources} />
      </Suspense>
      <div className="min-w-0 flex-1">
        <LastUpdated date={lastUpdated} />
        <Suspense fallback={null}>
          <CategoryFilter />
        </Suspense>
        <ArticleList articles={articles} />
      </div>
    </div>
  );
}

import { Suspense } from "react";
import { getArticles, getLastUpdated } from "@/lib/queries";
import ArticleList from "@/components/ArticleList";
import LastUpdated from "@/components/LastUpdated";
import CategoryFilter from "@/components/CategoryFilter";

export const revalidate = 0;

export default async function AllPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;

  const [articles, lastUpdated] = await Promise.all([
    getArticles({ articleCategory: cat, take: 60 }),
    getLastUpdated(),
  ]);

  return (
    <div>
      <LastUpdated date={lastUpdated} />
      <Suspense fallback={null}>
        <CategoryFilter />
      </Suspense>
      <ArticleList articles={articles} />
    </div>
  );
}

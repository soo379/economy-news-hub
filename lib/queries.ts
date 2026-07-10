import { prisma } from "./prisma";

export async function getArticles(opts: {
  category?: string;
  sourceSlug?: string;
  articleCategory?: string;
  take?: number;
} = {}) {
  const { category, sourceSlug, articleCategory, take = 60 } = opts;

  return prisma.article.findMany({
    where: {
      ...(articleCategory ? { category: articleCategory } : {}),
      source: {
        ...(category ? { category } : {}),
        ...(sourceSlug ? { slug: sourceSlug } : {}),
      },
    },
    include: { source: true },
    orderBy: { publishedAt: "desc" },
    take,
  });
}

export async function getSources(category?: string) {
  return prisma.source.findMany({
    where: category ? { category } : undefined,
    orderBy: { name: "asc" },
    include: { _count: { select: { articles: true } } },
  });
}

export async function getLastUpdated() {
  const latest = await prisma.article.findFirst({
    orderBy: { fetchedAt: "desc" },
  });
  return latest?.fetchedAt ?? null;
}

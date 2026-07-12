"use client";

import { useState } from "react";
import { timeAgo } from "@/lib/format";

type ArticleCardProps = {
  article: {
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
};

const CATEGORY_BADGE_STYLES: Record<string, string> = {
  마케팅: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  제품: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  투자: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  정책: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
};

const CATEGORY_ACCENT_STYLES: Record<string, string> = {
  마케팅: "border-l-emerald-500",
  제품: "border-l-blue-500",
  투자: "border-l-amber-500",
  정책: "border-l-purple-500",
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const [showOriginal, setShowOriginal] = useState(false);
  const hasTranslation = article.source.language === "en" && !!article.titleKo;

  const title = hasTranslation && !showOriginal ? article.titleKo! : article.title;
  const summary = showOriginal
    ? article.summary
    : article.aiSummary ?? article.summaryKo ?? article.summary;

  return (
    <article
      className={`group rounded-xl border border-l-4 border-stone-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-stone-800 dark:bg-stone-900 ${
        article.category ? CATEGORY_ACCENT_STYLES[article.category] ?? "border-l-stone-300" : "border-l-stone-200 dark:border-l-stone-800"
      }`}
    >
      <div className="mb-1.5 flex items-center gap-2 text-xs text-stone-500">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stone-200 text-[10px] font-bold text-stone-600 dark:bg-stone-700 dark:text-stone-300">
          {article.source.name.charAt(0)}
        </span>
        <span className="font-medium text-stone-600 dark:text-stone-300">{article.source.name}</span>
        {article.category && (
          <span
            className={`rounded-full px-2 py-0.5 font-medium ${
              CATEGORY_BADGE_STYLES[article.category] ?? "bg-stone-100 dark:bg-stone-800"
            }`}
          >
            {article.category}
          </span>
        )}
        <span className="text-stone-400">{timeAgo(new Date(article.publishedAt))}</span>
        {hasTranslation && (
          <button
            type="button"
            onClick={() => setShowOriginal((v) => !v)}
            className="ml-auto rounded underline decoration-dotted underline-offset-2 hover:text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:hover:text-stone-300"
          >
            {showOriginal ? "번역 보기" : "원문 보기"}
          </button>
        )}
      </div>
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
      >
        <h2 className="mb-1 text-base font-semibold leading-snug text-stone-900 group-hover:text-blue-700 dark:text-stone-100 dark:group-hover:text-blue-400">
          {title}
        </h2>
        {summary && (
          <p className="line-clamp-3 text-sm text-stone-600 dark:text-stone-400">{summary}</p>
        )}
      </a>
    </article>
  );
}

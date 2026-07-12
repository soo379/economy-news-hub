"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { withParam } from "@/lib/url";

const CATEGORIES = ["마케팅", "제품", "투자", "정책"];

const CATEGORY_ACTIVE_STYLES: Record<string, string> = {
  마케팅: "border-emerald-700 bg-emerald-700 text-white",
  제품: "border-blue-700 bg-blue-700 text-white",
  투자: "border-amber-600 bg-amber-600 text-white",
  정책: "border-purple-700 bg-purple-700 text-white",
};

const INACTIVE_STYLE =
  "border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-400 dark:hover:bg-stone-800";

export default function CategoryFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCat = searchParams.get("cat");

  return (
    <div className="mb-4 flex flex-wrap items-center gap-1.5">
      <Link
        href={withParam(pathname, searchParams, "cat", null)}
        className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
          !activeCat ? "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900" : INACTIVE_STYLE
        }`}
      >
        전체
      </Link>
      {CATEGORIES.map((cat) => (
        <Link
          key={cat}
          href={withParam(pathname, searchParams, "cat", cat)}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
            activeCat === cat ? CATEGORY_ACTIVE_STYLES[cat] : INACTIVE_STYLE
          }`}
        >
          {cat}
        </Link>
      ))}
    </div>
  );
}

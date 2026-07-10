"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { withParam } from "@/lib/url";

type SidebarSource = { slug: string; name: string; _count: { articles: number } };

export default function Sidebar({ sources }: { sources: SidebarSource[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get("source");

  return (
    <aside className="md:w-52 md:shrink-0">
      <nav
        aria-label="출처 필터"
        className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:gap-1 md:overflow-visible md:pb-0"
      >
        <SidebarLink
          href={withParam(pathname, searchParams, "source", null)}
          active={!activeSlug}
          label="전체"
        />
        {sources.map((s) => (
          <SidebarLink
            key={s.slug}
            href={withParam(pathname, searchParams, "source", s.slug)}
            active={activeSlug === s.slug}
            label={s.name}
            count={s._count.articles}
          />
        ))}
      </nav>
    </aside>
  );
}

function SidebarLink({
  href,
  active,
  label,
  count,
}: {
  href: string;
  active: boolean;
  label: string;
  count?: number;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border-l-2 px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 md:whitespace-normal ${
        active
          ? "border-l-blue-700 bg-blue-50 font-medium text-blue-900 dark:bg-blue-950/40 dark:text-blue-200"
          : "border-l-transparent text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-900"
      }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
          active
            ? "bg-blue-700 text-white"
            : "bg-stone-200 text-stone-600 dark:bg-stone-700 dark:text-stone-300"
        }`}
      >
        {label.charAt(0)}
      </span>
      <span className="flex-1">{label}</span>
      {typeof count === "number" && (
        <span className="text-xs tabular-nums text-stone-400">{count}</span>
      )}
    </Link>
  );
}

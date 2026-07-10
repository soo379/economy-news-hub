"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/domestic", label: "국내 경제" },
  { href: "/international", label: "해외 경제" },
  { href: "/", label: "경제 전체" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/90 backdrop-blur dark:border-stone-800 dark:bg-stone-950/90">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="group rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 dark:focus-visible:ring-offset-stone-950"
        >
          <span className="font-display text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            경제 브리핑
          </span>
          <span className="ml-2 hidden text-xs text-stone-400 sm:inline">
            국내·해외 경제 뉴스, 3시간마다 업데이트
          </span>
        </Link>
        <nav aria-label="주요 메뉴" className="flex gap-1">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 dark:focus-visible:ring-offset-stone-950 ${
                  active
                    ? "bg-blue-700 text-white"
                    : "text-stone-600 hover:bg-stone-200/70 dark:text-stone-400 dark:hover:bg-stone-800"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

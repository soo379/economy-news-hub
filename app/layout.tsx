import type { Metadata, Viewport } from "next";
import { Nanum_Myeongjo } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";

const display = Nanum_Myeongjo({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "경제 브리핑",
    template: "%s | 경제 브리핑",
  },
  description: "국내외 경제 뉴스를 3시간마다 모아 보여주는 경제 브리핑입니다.",
  openGraph: {
    title: "경제 브리핑",
    description: "국내외 경제 뉴스를 3시간마다 모아 보여주는 경제 브리핑입니다.",
    locale: "ko_KR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={display.variable}>
      <body className="min-h-screen bg-stone-50 text-stone-900 antialiased dark:bg-stone-950 dark:text-stone-100">
        <TopNav />
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">{children}</main>
      </body>
    </html>
  );
}

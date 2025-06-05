import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import { Suspense } from "react";
import Loading from "./loading";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Не знаеш какво ти се хапва? Тук си на правилното място!",
  description: `Пак не знаеш какво да сготвиш? Спокойно.
Отговори на няколко въпроса и “За Вечеря” ще ти подхвърли точната рецепта.
Бързо. Вкусно. Без излишни драми пред хладилника.`,
  other: { "apple-mobile-web-app-title": "Za Vecheria" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-amber-50 to-orange-100">
        <div className="absolute inset-0 bg-[url('/subtle-food-pattern.webp')] opacity-10"></div>
        <ReactQueryProvider>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

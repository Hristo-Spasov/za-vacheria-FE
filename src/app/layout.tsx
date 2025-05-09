import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import { Suspense } from "react";
import Loading from "./loading";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Незнаеш какво ти се хапва? Тук си на правилното място!",
  description: `Пак не знаеш какво да сготвиш? Спокойно.
Отговори на няколко въпроса и “За Вечеря” ще ти подхвърли точната рецепта.
Бързо. Вкусно. Без излишни драми пред хладилника.`,
  other : {"apple-mobile-web-app-title" : "Za Vecheria"},

};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

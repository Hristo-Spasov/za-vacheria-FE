import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import { Suspense } from "react";
import Loading from "./loading";
import Script from "next/script";
import { headers } from "next/headers";
import { HomeModal } from "@/components/HomeModal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Не знаеш какво ти се хапва? Тук си на правилното място!",
  description: `Пак не знаеш какво да сготвиш? Спокойно.
Отговори на няколко въпроса и “За Вечеря” ще ти подхвърли точната рецепта.
Бързо. Вкусно. Без излишни драми пред хладилника.`,
  applicationName: "Za Vecheria",
  metadataBase: new URL("https://zavecheria.com"),
  other: { "apple-mobile-web-app-title": "Za Vecheria" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") ?? "";
  return (
    <html lang="bg">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://umami.zavecheria.com/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
          nonce={nonce}
        />
      </head>
      <body className="bg-gradient-to-b from-amber-50 to-orange-100">
        <HomeModal />
        <div className="absolute inset-0 bg-[url('/subtle-food-pattern.webp')] opacity-10"></div>
        <ReactQueryProvider>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

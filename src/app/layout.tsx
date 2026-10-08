import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import { Suspense } from "react";
import Loading from "./loading";
import Script from "next/script";
import { headers } from "next/headers";
import { HomeModal } from "@/components/HomeModal";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://zavecheria.com"),
  title: {
    default: "Какво да сготвя днес? Намерете рецепти по ваш вкус | За Вечеря",
    template: "%s | За Вечеря",
  },
  description:
    "Отговорете на няколко въпроса и „За Вечеря“ ще ви предложи точната рецепта. Над 1400 рецепти – от българска до интернационална кухня. Безплатно и бързо.",
  keywords: [
    "рецепти",
    "какво да сготвя",
    "какво да готвя",
    "рецепти за вечеря",
    "лесни рецепти",
    "български рецепти",
    "идеи за вечеря",
    "кулинарни рецепти",
  ],
  applicationName: "За Вечеря",
  authors: [{ name: "За Вечеря" }],
  openGraph: {
    type: "website",
    locale: "bg_BG",
    siteName: "За Вечеря",
    title: "Какво да сготвя днес? Намерете рецепти по ваш вкус | За Вечеря",
    description:
      "Отговорете на няколко въпроса и „За Вечеря“ ще ви предложи точната рецепта. Над 1400 рецепти. Безплатно и бързо.",
    url: "https://zavecheria.com",
    images: [
      {
        url: "/default_fallback_pic.png",
        width: 1200,
        height: 630,
        alt: "За Вечеря - рецепти по ваш вкус",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Какво да сготвя днес? | За Вечеря",
    description:
      "Отговорете на няколко въпроса и получете персонализирани рецепти. Безплатно и бързо.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: { "apple-mobile-web-app-title": "Za Vecheria" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") ?? "";
  return (
    <html lang="bg" className="scroll-smooth">
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
        <ReactQueryProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </main>
            <Footer />
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

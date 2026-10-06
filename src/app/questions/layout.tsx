import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Въпросник – Намерете перфектната рецепта",
  description:
    "Отговорете на няколко кратки въпроса за вкусовете и продуктите ви и получите персонализирани рецепти от За Вечеря.",
  alternates: {
    canonical: "/questions",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function QuestionsLayout({ children }: { children: ReactNode }) {
  return children;
}
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/questions",
  },
};

export default function QuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
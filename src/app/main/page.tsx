import FilterSection from "@/components/mainPageUI/FilterSection";
import HeroSectionMain from "@/components/mainPageUI/HeroSectionMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/main",
  },
};

const page = () => {
  return (
    <>
      <HeroSectionMain />
      <FilterSection />
    </>
  );
};

export default page;

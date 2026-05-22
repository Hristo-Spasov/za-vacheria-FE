import HeroSectionMain from "@/components/mainPageUI/HeroSectionMain";
import { Metadata } from "next";
import { mainPageServices } from "@/services/mainPageServices";
import MainPageContent from "./MainPageContent";
import { Suspense } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: "/main",
  },
};

const mainPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const recipeInitialResponse = await mainPageServices.getRecipes(page);

  return (
    <>
      <HeroSectionMain />
      <Suspense fallback={<div>Loading...</div>}>
        <MainPageContent
          initialRecipes={recipeInitialResponse.data}
          initialMeta={recipeInitialResponse.meta}
          initialPage={page}
        />
      </Suspense>
    </>
  );
};

export default mainPage;

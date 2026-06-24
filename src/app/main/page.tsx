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
  searchParams: Promise<{ page?: string; categories?: string; difficulties?: string; maxTime?: string }>;
}) => {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const initialCategories = params.categories ? params.categories.split(",").map(Number) : [];
  const initialDifficulties = params.difficulties ? params.difficulties.split(",").map(Number) : [];
  const initialTime = params.maxTime ? Number(params.maxTime) : null;

  const [recipeInitialResponse, categories, difficultyLevels] = await Promise.all([
    mainPageServices.getRecipes(page),
    mainPageServices.getCategories(),
    mainPageServices.getDifficultyLevels(),
  ]);

  return (
    <>
      <HeroSectionMain />
      <Suspense fallback={<div>Loading...</div>}>
        <MainPageContent
          initialRecipes={recipeInitialResponse.data}
          initialMeta={recipeInitialResponse.meta}
          initialPage={page}
          categories={categories}
          difficultyLevels={difficultyLevels}
          initialCategories={initialCategories}
          initialDifficulties={initialDifficulties}
          initialTime={initialTime}
        />
      </Suspense>
    </>
  );
};

export default mainPage;

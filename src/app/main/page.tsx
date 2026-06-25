import HeroSectionMain from "@/components/mainPageUI/HeroSectionMain";
import { Metadata } from "next";
import { mainPageServices } from "@/services/mainPageServices";
import MainPageContent from "./MainPageContent";
import MainPageSkeleton from "./MainPageSkeleton";
import { Suspense } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: "/main",
  },
};

type mainPageProps = Promise<{
  search?: string;
  page?: string;
  categories?: string;
  difficulties?: string;
  maxTime?: string;
}>;

const mainPage = async ({ searchParams }: { searchParams: mainPageProps }) => {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const initialCategories = params.categories
    ? params.categories.split(",").map(Number)
    : [];
  const initialDifficulties = params.difficulties
    ? params.difficulties.split(",").map(Number)
    : [];
  const initialTime = params.maxTime ? Number(params.maxTime) : null;
  const initialSearch = params.search ? params.search.toLowerCase() : "";

  const [recipeInitialResponse, categories, difficultyLevels] =
    await Promise.all([
      mainPageServices.getRecipes( initialSearch,page),
      mainPageServices.getCategories(),
      mainPageServices.getDifficultyLevels(),
    ]);

  return (
    <>
      <HeroSectionMain />
      <Suspense fallback={<MainPageSkeleton />}>
        <MainPageContent
          initialRecipes={recipeInitialResponse.data}
          initialMeta={recipeInitialResponse.meta}
          initialPage={page}
          categories={categories}
          difficultyLevels={difficultyLevels}
          initialCategories={initialCategories}
          initialDifficulties={initialDifficulties}
          initialTime={initialTime}
          initialSearch={initialSearch}
        />
      </Suspense>
    </>
  );
};

export default mainPage;

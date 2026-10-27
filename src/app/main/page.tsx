import HeroSectionMain from "@/components/mainPageUI/HeroSectionMain";
import { Metadata } from "next";
import { mainPageServices } from "@/services/mainPageServices";
import MainPageContent from "./MainPageContent";
import MainPageSkeleton from "./MainPageSkeleton";
import { cache, Suspense } from "react";
import { notFound } from "next/navigation";
import { InvalidListingParamsError, RecipePageNotFoundError, ListingSearchParams, parseListingParams, listingCanonical } from "@/lib/recipeListingParams";

const listingMetadata: Metadata = {
  title: "Всички рецепти – разгледайте по категория и трудност",
  description:
    "Разгледайте над 1400 рецепти по категории, трудност и време за приготвяне. Намерете идеята за вашата следваща вечеря с За Вечеря.",
  alternates: {
    canonical: "/main",
  },
};

type mainPageProps = Promise<ListingSearchParams>;

function readParams(params: ListingSearchParams) {
  try {
    // Public listing pages always use 30 recipes; the API has a separate cap.
    return parseListingParams({ ...params, pageSize: undefined });
  } catch (error) {
    if (error instanceof InvalidListingParamsError) notFound();
    throw error;
  }
}

const getMainRecipes = cache(async (search: string, page: number, categories: string, difficulties: string, maxTime: number | null) => {
  try {
    return await mainPageServices.getRecipes(search, page, 30, {
      categories: categories ? categories.split(",").map(Number) : [],
      difficulties: difficulties ? difficulties.split(",").map(Number) : [],
      maxTime,
    });
  } catch (error) {
    if (error instanceof InvalidListingParamsError || error instanceof RecipePageNotFoundError) notFound();
    throw error;
  }
});

export async function generateMetadata({ searchParams }: { searchParams: mainPageProps }): Promise<Metadata> {
  const { page, search, filters } = readParams(await searchParams);
  await getMainRecipes(search, page, filters.categories.join(","), filters.difficulties.join(","), filters.maxTime);
  const filtered = !!(search || filters.categories.length || filters.difficulties.length || filters.maxTime !== null);
  return {
    ...listingMetadata,
    alternates: { canonical: listingCanonical("/main", page) },
    ...(filtered ? { robots: { index: false, follow: true } } : {}),
  };
}

const mainPage = async ({ searchParams }: { searchParams: mainPageProps }) => {
  const { page, search: initialSearch, filters } = readParams(await searchParams);
  const { categories: initialCategories, difficulties: initialDifficulties, maxTime: initialTime } = filters;

  const recipeInitialResponse = await getMainRecipes(initialSearch, page, initialCategories.join(","), initialDifficulties.join(","), initialTime);

  const [categories, difficultyLevels] =
    await Promise.all([
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

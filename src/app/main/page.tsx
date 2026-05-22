import HeroSectionMain from "@/components/mainPageUI/HeroSectionMain";
import { Metadata } from "next";
import { mainPageServices } from "@/services/mainPageServices";
import MainPageContent from "./MainPageContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/main",
  },
};

const mainPage = async () => {
  const recipeInitialResponse = await mainPageServices.getRecipes();

  return (
    <>
      <HeroSectionMain />
      <MainPageContent
        initialRecipes={recipeInitialResponse.data}
        initialMeta={recipeInitialResponse.meta}
      />
    </>
  );
};

export default mainPage;

import strapiClient from "@/lib/clients/strapi";
import { Category, DifficultyLevel } from "@/types/recipes";
import { getAllCategories } from "@/lib/server/utils/categoryUtils";
import { getRecipeListing } from "@/lib/server/utils/recipeListingUtils";
import { InvalidListingParamsError, RecipeFilters } from "@/lib/recipeListingParams";
import { unstable_cache } from "next/cache";

const getDifficultyLevels = unstable_cache(async (): Promise<DifficultyLevel[]> => {
  const response = await strapiClient.get("/difficulty-levels");
  return response.data.data;
}, ["strapi-difficulty-levels"], { revalidate: 3600, tags: ["difficulty-levels"] });

export const mainPageServices = {
  getRecipes: async (
    search = "",
    page = 1,
    pageSize = 30,
    filters?: RecipeFilters,
  ) => {
    if (filters?.categories?.length) {
      const categories = await getAllCategories();
      if (filters.categories.some((id) => !categories.some((category) => category.id === id))) {
        throw new InvalidListingParamsError("Unknown category");
      }
    }
    if (filters?.difficulties?.length) {
      const difficulties = await getDifficultyLevels();
      if (filters.difficulties.some((id) => !difficulties.some((difficulty) => difficulty.id === id))) {
        throw new InvalidListingParamsError("Unknown difficulty");
      }
    }
    return getRecipeListing(search, page, pageSize, filters);
  },
  getCategories: async () => {
    try {
      const categories = await getAllCategories();
      const sortedCategories = [...categories].sort(
        (a: Category, b: Category) => {
          return b.recipes.length - a.recipes.length;
        },
      );
      return sortedCategories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
  getDifficultyLevels,
};

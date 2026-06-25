import strapiClient from "@/lib/clients/strapi";
import { Category, RecipeResponse } from "@/types/recipes";

export const mainPageServices = {
  getRecipes: async (
    page = 1,
    pageSize = 30,
    filters?: {
      categories?: number[];
      difficulties?: number[];
      maxTime?: number | null;
    },
  ): Promise<RecipeResponse> => {
    try {
      let url = `/recipes?sort[0]=updatedAt&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`;

      // Strapi category filter: recipes that have ANY of the selected categories
      if (filters?.categories?.length) {
        filters.categories.forEach((catId, i) => {
          url += `&filters[categories][id][$in][${i}]=${catId}`;
        });
      }

      // Strapi difficulty filter
      if (filters?.difficulties?.length) {
        filters.difficulties.forEach((diffId, i) => {
          url += `&filters[difficultyLevel][id][$in][${i}]=${diffId}`;
        });
      }

      // Strapi time filter: totalTime <= maxTime (skip for Infinity = "60+ мин")
      if (filters?.maxTime !== null && filters?.maxTime !== undefined && isFinite(filters.maxTime)) {
        url += `&filters[totalTime][$lte]=${filters.maxTime}`;
      }

      const response = await strapiClient.get(url);

      return {
        data: response.data.data,
        meta: response.data.meta,
      };
    } catch (error) {
      console.error("Error fetching recipes for the main page:", error);
      throw error;
    }
  },
  getCategories: async () => {
    try {
      const res = await strapiClient.get(
        "/categories?filters[recipes][$notNull]=true&populate=recipes",
      );
      const sortedCategories = res.data.data.sort((a: Category, b: Category) => {
        return b.recipes.length - a.recipes.length;
      });
      return sortedCategories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
  getDifficultyLevels: async () => {
    try {
      const res = await strapiClient.get("/difficulty-levels");
      return res.data.data;
    } catch (error) {
      console.error("Error fetching difficulty levels:", error);
      throw error;
    }
  },
};
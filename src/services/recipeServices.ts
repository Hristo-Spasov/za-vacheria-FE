import strapiClient from "@/lib/clients/strapi";
import { Recipe, RecipeResponse } from "@/types/recipes";

export const recipeService = {
  getAllRecipes: async (): Promise<RecipeResponse> => {
    try {
      const response = await strapiClient.get(
        "/recipes?populate[image][populate]=*&populate[categories][populate]=*&populate[difficultyLevel][populate]=*&populate[ingredients][populate]=*"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching all recipes:", error);
      throw error;
    }
  },

  getRecipesWithFilters: async (
    search?: string,
    difficulty?: string,
    maxTime?: number,
    category?: string
  ): Promise<RecipeResponse> => {
    try {
      let query = "/recipes?populate[image][populate]=*&populate[categories][populate]=*&populate[difficultyLevel][populate]=*&populate[ingredients][populate]=*";

      // Add filters
      if (search) {
        query += `&filters[title][$containsi]=${encodeURIComponent(search)}`;
      }
      if (difficulty) {
        query += `&filters[difficultyLevel][identifier][$eq]=${encodeURIComponent(difficulty)}`;
      }
      if (maxTime) {
        query += `&filters[totalTime][$lte]=${maxTime}`;
      }
      if (category) {
        query += `&filters[categories][slug][$eq]=${encodeURIComponent(category)}`;
      }

      const response = await strapiClient.get(query);
      return response.data;
    } catch (error) {
      console.error("Error fetching recipes with filters:", error);
      throw error;
    }
  },

  getRecipeById: async (documentId: string): Promise<Recipe | null> => {
    try {
      const response = await strapiClient.get(
        `/recipes/${documentId}?populate[image][populate]=*&populate[categories][populate]=*&populate[difficultyLevel][populate]=*&populate[ingredients][populate]=*`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching recipe by ID:", error);
      throw error;
    }
  },
};
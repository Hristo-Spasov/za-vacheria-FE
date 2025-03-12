import strapiClient from "@/lib/clients/strapi";
import { Recipe } from "@/types/recipes";

export type RecipeResponse = {
  data: Recipe[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export const recipeService = {
  getBestRecipes: async (
    answers: Record<string, string | string[]>
  ): Promise<RecipeResponse> => {
    try {
      const queryParams = new URLSearchParams();

      Object.entries(answers).forEach(([questionId, answer]) => {
        if (Array.isArray(answer)) {
          // Handle multi-select answers
          answer.forEach((value) => {
            queryParams.append(`filters[${questionId}]`, value);
          });
        } else {
          // Handle single-select answers
          queryParams.append(`filters[${questionId}]`, answer);
        }
      });
      const response = await strapiClient.get(
        `/recipes?populate=*&${queryParams.toString()}`
      );
      console.log("Recipe response", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching questions:", error);
      return {
        data: [],
        meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } },
      };
    }
  },
};

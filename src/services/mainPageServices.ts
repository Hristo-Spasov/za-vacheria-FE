import strapiClient from "@/lib/clients/strapi";
import { RecipeResponse } from "@/types/recipes";

export const mainPageServices = {
  getRecipes: async (): Promise<RecipeResponse> => {
    try {
      const response = await strapiClient.get(
        "/recipes?sort[0]=updatedAt&pagination[page]=0&pagination[pageSize]=30&populate=*",
      );
      //! Response logging TO BE REMOVED
      // console.log(response.data);

      return {
        data: response.data.data,
        meta: response.data.meta,
      };
    } catch (error) {
      console.error("Error fetching recipes for the main page:", error);
      throw error;
    }
  },
};

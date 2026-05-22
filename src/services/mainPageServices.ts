import strapiClient from "@/lib/clients/strapi";
import { RecipeResponse } from "@/types/recipes";

export const mainPageServices = {
  getRecipes: async (page = 1, pageSize = 30): Promise<RecipeResponse> => {
    try {
      const response = await strapiClient.get(
        `/recipes?sort[0]=updatedAt&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`,
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

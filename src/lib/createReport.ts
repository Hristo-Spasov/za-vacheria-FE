// 1. Check if such recipe exists
import strapiClient from "./clients/strapi";
import { getRecipeById } from "./server/utils/recipeUtils";
const createReport = async (recipeId: string, userIp: string) => {
  const recipe = await getRecipeById(recipeId);
  if (!recipe) {
    throw new Error("Recipe not found");
  }

  await strapiClient.post(`/reports/`, {
    data: {
      reportId: recipeId,
      identity: userIp,
      recipeName: recipe.title,
    },
  });
};

export default createReport;

import strapiClient from "./clients/strapi";
import { getRecipeById } from "./server/utils/recipeUtils";
const createReport = async (recipeId: string, userIp: string) => {
  const reportToken = process.env.STRAPI_REPORT_API_TOKEN;
  if (!reportToken) {
    throw new Error("STRAPI_REPORT_API_TOKEN is not configured");
  }

  const recipe = await getRecipeById(recipeId);
  if (!recipe) {
    throw new Error("Recipe not found");
  }

  await strapiClient.post(
    "/reports/",
    {
      data: {
        reportId: recipeId,
        identity: userIp,
        recipeName: recipe.title,
      },
    },
    {
      // Override the shared read-only token only for this write request.
      headers: { Authorization: `Bearer ${reportToken}` },
    },
  );
};

export default createReport;

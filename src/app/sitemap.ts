import strapiClient from "@/lib/clients/strapi";
import { Recipe, RecipeResponse } from "@/types/recipes";
import { getCachedRecipes, cacheRecipes } from "@/lib/server/utils/cachedUtils";
import type { MetadataRoute } from "next";
import { formatNameForUrl } from "@/components/ui/utils/helpers";

const SITEMAP_SIZE = 50000; // Google's limit
const STRAPI_PAGE_SIZE = 25; // Strapi's default page size
const SITEMAP_SESSION_ID = "sitemap_recipes"; // Special session ID for sitemap cache

async function fetchAllRecipes(): Promise<Recipe[]> {
  const cachedData = getCachedRecipes(SITEMAP_SESSION_ID);
  if (cachedData) {
    console.log("Using cached recipes for sitemap");
    return cachedData.data;
  }

  console.log("Fetching fresh recipes from Strapi for sitemap");
  const allRecipes: Recipe[] = [];
  let currentPage = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      console.log(`Fetching page ${currentPage}...`);

      const axiosResponse = await strapiClient.get(
        `/recipes?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=${STRAPI_PAGE_SIZE}&sort=updatedAt:desc`
      );

      const responseData: RecipeResponse = axiosResponse.data;

      // console.log('Axios response status:', axiosResponse.status)
      // console.log('Response data type:', typeof responseData)
      // console.log('Response data keys:', responseData ? Object.keys(responseData) : 'null/undefined')

      if (!responseData || !responseData.data) {
        console.error("Invalid response structure from Strapi");
        break;
      }

      const recipes = responseData.data;

      if (!Array.isArray(recipes)) {
        console.error("Recipes data is not an array:", typeof recipes);
        break;
      }

      if (recipes.length === 0) {
        console.log("No more recipes found");
        break;
      }

      console.log(`Found ${recipes.length} recipes on page ${currentPage}`);
      allRecipes.push(...recipes);

      // Check pagination from Strapi response
      if (responseData.meta && responseData.meta.pagination) {
        const { page, pageCount } = responseData.meta.pagination;
        hasMore = page < pageCount;
        console.log(`Page ${page}/${pageCount} processed`);
        currentPage++;
      } else {
        console.log("No pagination meta found, stopping after first page");
        hasMore = false;
      }
    } catch (error) {
      console.error(`Error fetching recipes page ${currentPage}:`);
      console.error(
        "Error message:",
        error instanceof Error ? error.message : String(error)
      );
      hasMore = false;
    }
  }

  // Cache the results
  if (allRecipes.length > 0) {
    const recipeResponse: RecipeResponse = {
      data: allRecipes,
      meta: {
        pagination: {
          page: 1,
          pageSize: allRecipes.length,
          pageCount: 1,
          total: allRecipes.length,
        },
      },
    };

    cacheRecipes(SITEMAP_SESSION_ID, recipeResponse);
  }

  console.log(`Total recipes fetched and cached: ${allRecipes.length}`);
  return allRecipes;
}

export async function generateSitemaps() {
  try {
    const allRecipes = await fetchAllRecipes();
    const sitemapsNeeded = Math.max(
      1,
      Math.ceil(allRecipes.length / SITEMAP_SIZE)
    );

    console.log(
      `Generating ${sitemapsNeeded} sitemaps for ${allRecipes.length} recipes`
    );

    return Array.from({ length: sitemapsNeeded }, (_, i) => ({ id: i }));
  } catch (error) {
    console.error("Error generating sitemaps:", error);
    return [{ id: 0 }];
  }
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  try {
    console.log(`Generating sitemap ${id}`);

    const allRecipes = await fetchAllRecipes();

    if (allRecipes.length === 0) {
      console.warn("No recipes available for sitemap generation");
      return [];
    }

    const startIndex = id * SITEMAP_SIZE;
    const endIndex = startIndex + SITEMAP_SIZE;
    const recipesForThisSitemap = allRecipes.slice(startIndex, endIndex);

    if (recipesForThisSitemap.length === 0) {
      console.warn(`No recipes found for sitemap ${id}`);
      return [];
    }

    console.log(
      `Generated ${recipesForThisSitemap.length} URLs for sitemap ${id}`
    );

    return recipesForThisSitemap.map((recipe: Recipe) => ({
      url: `https://zavecheria.com/recipe/${
        recipe.documentId
      }/${formatNameForUrl(recipe.title)}`,
      lastModified: recipe.updatedAt || recipe.createdAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error(`Error generating sitemap ${id}:`, error);
    return [];
  }
}

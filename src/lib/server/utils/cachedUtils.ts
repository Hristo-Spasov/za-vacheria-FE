import { RecipeResponse } from "@/types/recipes";

const recipeCache: Record<string, { data: RecipeResponse; timestamp: number }> =
  {};
const CACHE_EXPIRY = 15 * 60 * 1000; // 15 minutes

export const cacheRecipes = (sessionId: string, data: RecipeResponse): void => {
  recipeCache[sessionId] = {
    data,
    timestamp: Date.now(),
  };
};

export const getCachedRecipes = (sessionId: string): RecipeResponse | null => {
  const cached = recipeCache[sessionId];

  if (!cached) return null;

  // Check if cache is expired
  if (Date.now() - cached.timestamp > CACHE_EXPIRY) {
    delete recipeCache[sessionId];
    return null;
  }

  return cached.data;
};

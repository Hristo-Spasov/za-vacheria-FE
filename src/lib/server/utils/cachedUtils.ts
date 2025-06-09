import { RecipeResponse } from "@/types/recipes";
import redis from "@/lib/clients/redis";


const CACHE_EXPIRY = 15 * 60 * 1000; // 15 minutes

export const cacheRecipes = async (sessionId: string, data: RecipeResponse): Promise<void> => {
  try {
    await redis.set(sessionId, JSON.stringify(data), "EX", CACHE_EXPIRY);
  } catch (error) {
    console.error("Error caching recipes:", error);
  }
};

export const getCachedRecipes = async (sessionId: string): Promise<RecipeResponse | null> => {
  try {
    const cached = await redis.get(sessionId);
    if (!cached) return null;

    return JSON.parse(cached) as RecipeResponse;
  } catch (error) {
    console.error("Redis error:", error);
    return null;
  }
};

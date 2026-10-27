import { unstable_cache } from "next/cache";
import strapiClient from "@/lib/clients/strapi";
import { RecipeResponse } from "@/types/recipes";
import { RecipePageNotFoundError, RecipeFilters, parseListingParams } from "@/lib/recipeListingParams";

async function fetchTotal(query: string): Promise<number> {
  const response = await strapiClient.get(
    `/recipes?status=published&fields[0]=documentId&pagination[page]=1&pagination[pageSize]=1${query}`,
  );
  const total = response.data.meta?.pagination?.total;
  if (!Number.isSafeInteger(total) || total < 0) throw new Error("Invalid recipe total from Strapi");
  return total;
}

const getCachedTotal = unstable_cache(fetchTotal, ["strapi-published-recipe-totals"], {
  revalidate: 60, tags: ["recipes"],
});

async function fetchPage(query: string, page: number, pageSize: number): Promise<RecipeResponse> {
  const response = await strapiClient.get(
    `/recipes?status=published&sort[0]=updatedAt&sort[1]=documentId&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*${query}`,
  );
  if (page > Math.max(1, response.data.meta.pagination.pageCount)) {
    throw new RecipePageNotFoundError("Recipe page does not exist");
  }
  return response.data;
}

const getCachedPage = unstable_cache(fetchPage, ["strapi-recipe-listings"], {
  revalidate: 60, tags: ["recipes"],
});

const getCachedCategoryPage = unstable_cache(fetchPage, ["strapi-category-listings"], {
  revalidate: 3600, tags: ["categories", "recipes"],
});

export async function getRecipeListing(search = "", page = 1, pageSize = 30, filters?: RecipeFilters): Promise<RecipeResponse> {
  // Validate here too, so another caller cannot bypass the HTTP parameter checks.
  const normalized = parseListingParams({
    search, page: String(page), pageSize: String(pageSize),
    categories: filters?.categories?.join(","),
    difficulties: filters?.difficulties?.join(","),
    maxTime: filters?.maxTime == null ? undefined : String(filters.maxTime),
  });
  const { categories, difficulties, maxTime } = normalized.filters;
  const params = new URLSearchParams();
  if (normalized.search) params.set("_q", normalized.search);
  categories.forEach((id, index) => params.set(`filters[categories][id][$in][${index}]`, String(id)));
  difficulties.forEach((id, index) => params.set(`filters[difficultyLevel][id][$in][${index}]`, String(id)));
  if (maxTime !== null && Number.isFinite(maxTime)) params.set("filters[totalTime][$lte]", String(maxTime));
  const query = params.size ? `&${params.toString()}` : "";

  // Only main/category listings get persistent entries. Free-text and other
  // filter combinations cannot create an unbounded persistent cache key space.
  const cacheable = !normalized.search && !difficulties.length && maxTime === null && categories.length <= 1;
  const globalTotal = await getCachedTotal("");
  if (page > Math.max(1, Math.ceil(globalTotal / pageSize))) {
    throw new RecipePageNotFoundError("Recipe page does not exist");
  }
  if (query && page > 1) {
    const total = cacheable ? await getCachedTotal(query) : await fetchTotal(query);
    if (page > Math.max(1, Math.ceil(total / pageSize))) {
      throw new RecipePageNotFoundError("Recipe page does not exist");
    }
  }
  if (!cacheable) return fetchPage(query, page, pageSize);
  // Preserve the existing one-hour category policy rather than refreshing it
  // on every ~80-second crawler revisit. Main listings use the shorter policy.
  return categories.length ? getCachedCategoryPage(query, page, pageSize) : getCachedPage(query, page, pageSize);
}

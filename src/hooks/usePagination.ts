import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { RecipeResponse } from "@/types/recipes";
import { LISTING_STALE_TIME, RecipeFilters } from "@/lib/recipeListingParams";

export function recipeQueryKey(page: number, pageSize: number, search: string | undefined, filters?: RecipeFilters) {
  return ["recipes", page, pageSize, search?.trim().toLowerCase() || "",
    [...(filters?.categories ?? [])].sort((a, b) => a - b),
    [...(filters?.difficulties ?? [])].sort((a, b) => a - b),
    Number.isFinite(filters?.maxTime) ? filters?.maxTime : null];
}

class RecipeRequestError extends Error {
  constructor(public status: number) { super("Failed to fetch paginated data"); }
}

export const usePagination = (
  page: number,
  pageSize: number = 30,
  search?: string,
  filters?: RecipeFilters,
  initial?: { page: number; search: string; filters: RecipeFilters; data: RecipeResponse },
) => {
  const queryKey = recipeQueryKey(page, pageSize, search, filters);
  const matchesInitial = initial && JSON.stringify(queryKey) === JSON.stringify(
    recipeQueryKey(initial.page, pageSize, initial.search, initial.filters),
  );
  return useQuery<RecipeResponse, Error>({
    queryKey,
    initialData: matchesInitial ? initial.data : undefined,
    staleTime: LISTING_STALE_TIME,
    retry: (attempt, error) => !(error instanceof RecipeRequestError && error.status < 500) && attempt < 2,
    queryFn: async ({ signal }) => {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("pageSize", pageSize.toString());

      if (search) {
        params.set("search", search);
      }
      if (filters?.categories?.length) {
        params.set("categories", filters.categories.join(","));
      }
      if (filters?.difficulties?.length) {
        params.set("difficulties", filters.difficulties.join(","));
      }
      if (filters?.maxTime !== null && filters?.maxTime !== undefined) {
        params.set("maxTime", filters.maxTime.toString());
      }

      const response = await fetch(`/api/recipes?${params.toString()}`, { signal });

      if (!response.ok) throw new RecipeRequestError(response.status);
      return response.json();
    },
    placeholderData: keepPreviousData<RecipeResponse>,
  });
};

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { RecipeResponse } from "@/types/recipes";

export const usePagination = (
  page: number,
  pageSize: number = 30,
  search?: string,
  filters?: {
    categories?: number[];
    difficulties?: number[];
    maxTime?: number | null;
  },
) => {
  return useQuery<RecipeResponse, Error>({
    queryKey: ["recipes", page, pageSize,search, filters],
    queryFn: async () => {
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

      const response = await fetch(`/api/recipes?${params.toString()}`);

      if (!response.ok) throw new Error("Failed to fetch paginated data");
      return response.json();
    },
    placeholderData: keepPreviousData<RecipeResponse>,
  });
};
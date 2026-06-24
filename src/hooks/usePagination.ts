import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { RecipeResponse } from "@/types/recipes";

export const usePagination = (page: number, pageSize: number = 30) => {
  return useQuery<RecipeResponse, Error>({
    queryKey: ["recipes", page, pageSize],
    queryFn: async () => {
      const response = await fetch(
        `/api/recipes?page=${page}&pageSize=${pageSize}`,
      );

      if (!response.ok) throw new Error("Failed to fetch paginated data");
      return response.json();
    },
    placeholderData: keepPreviousData<RecipeResponse>,
  });
};

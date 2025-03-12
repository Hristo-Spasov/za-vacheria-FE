import { useMutation } from "@tanstack/react-query";
import { RecipeResponse, recipeService } from "@/api/recipeServices";

export const useRecipes = () => {
  return useMutation<RecipeResponse, Error, Record<string, string | string[]>>({
    mutationFn: (answer) => recipeService.getBestRecipes(answer),
  });
};

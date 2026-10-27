import { questionService } from "@/services/questionServices";
import strapiClient from "@/lib/clients/strapi";
import { Question } from "@/types/questions";
import { Recipe, RecipeResponse } from "@/types/recipes";
import { getCachedRecipes, cacheRecipes } from "./cachedUtils";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import axios from "axios";

export const buildFilterQuery = (
  userAnswers: Record<string, string | string[]>,
  questions: Question[]
): string => {
  const queryParams = new URLSearchParams();
  const categoryIds: number[] = [];

  Object.entries(userAnswers).forEach(([questionId, selectedAnswer]) => {
    const question = questions.find((q) => q.documentId === questionId);

    if (!question) return;

    //  Handle multi-select questions

    const options = Array.isArray(selectedAnswer)
      ? question.options.filter((opt) => selectedAnswer.includes(opt.option))
      : question.options.filter((opt) => opt.option === selectedAnswer);
    // console.log("Question", question.options);
    // console.log("Selected Option", options);

    options.forEach((option) => {
      if (option.filterType === "none") return;
      if (option.filterType === "field" && option.filterField) {
        const operator = option.filterOperator || "eq";

        if (operator === "between" && option.filterValue?.includes("-")) {
          const [min, max] = option.filterValue.split("-").map(Number);
          queryParams.append(
            `filters[${option.filterField}][$gte]`,
            String(min)
          );
          queryParams.append(
            `filters[${option.filterField}][$lt]`,
            String(max)
          );
        } else if (option.filterField === "difficultyLevel") {
          const fieldPath = `filters[${option.filterField}][identifier][$${operator}]`;
          queryParams.append(fieldPath, option.filterValue || "");
        } else {
          const fieldPath = `filters[${option.filterField}][$${operator}]`;
          queryParams.append(fieldPath, option.filterValue || "");
        }
      } else if (
        option.filterType === "category" &&
        option.categories &&
        option.categories.length > 0
      ) {
        option.categories.forEach((category) => {
          categoryIds.push(category.id);
        });
      }
    });
  });

  //Remove duplicate category IDs
  if (categoryIds.length > 0) {
    const uniqueCategoryIds = [...new Set(categoryIds)];
    uniqueCategoryIds.forEach((id) => {
      queryParams.append("filters[categories][id][$in]", id.toString());
    });
  }

  queryParams.append("populate", "*");

  return queryParams.toString();
};

export const fetchFilteredRecipes = async (
  queryParams: string
): Promise<RecipeResponse> => {
  try {
    const response = await strapiClient.get(`/recipes?${queryParams}`);
    // console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered recipes:", error);
    return {
      data: [],
      meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } },
    };
  }
};

export const getRecipesFromUserAnswers = async (
  userAnswers: Record<string, string | string[]>,
  session: string
): Promise<RecipeResponse> => {
  // Check cache first
  const cachedRecipes = await getCachedRecipes(session);
  if (cachedRecipes) {
    // console.log("Using cached recipes for session:", session);
    return cachedRecipes;
  }

  const questionsResponse = await questionService.getQuestions();
  const questions = questionsResponse.data || [];

  if (!questions.length) {
    throw new Error("Failed to fetch questions data");
  }

  const queryParams = buildFilterQuery(userAnswers, questions);

  // Getting a random page so data feels fresh everytime
  const initialResponse = await fetchFilteredRecipes(queryParams);
  const totalPages = initialResponse.meta?.pagination?.pageCount || 1;

  let randomPage = 1;
  if (totalPages > 1) {
    randomPage = Math.floor(Math.random() * totalPages) + 1;
  }

  const randomPageQueryParams = new URLSearchParams(queryParams);
  randomPageQueryParams.set("pagination[page]", randomPage.toString());
  randomPageQueryParams.set("pagination[pageSize]", "18");

  // console.log("Random page:", randomPage);

  // Fetch recipes from the random page
  const results = await fetchFilteredRecipes(randomPageQueryParams.toString());

  // Cache the results
  cacheRecipes(session, results);

  return results;
};

const getCachedRecipeById = unstable_cache(
  async (id: string): Promise<Recipe> => {
    const response = await strapiClient.get(
      `/recipes/${id}?status=published&populate[0]=image&populate[1]=categories&populate[2]=difficultyLevel&populate[3]=ingredients&populate[4]=ingredients.unit`
    );
    if (!response.data.data) throw new Error("Invalid recipe response from Strapi");
    return response.data.data;
  },
  ["strapi-recipe-details"],
  { revalidate: 300, tags: ["recipes"] },
);

export const getRecipeById = cache(async (id: string): Promise<Recipe | null> => {
  if (!/^[a-zA-Z0-9_-]{1,64}$/.test(id)) return null;
  try {
    return await getCachedRecipeById(id);
  } catch (error) {
    // Missing recipes are not persisted. Outages must not become cached 404s.
    if (axios.isAxiosError(error) && error.status === 404) return null;
    throw error;
  }
});

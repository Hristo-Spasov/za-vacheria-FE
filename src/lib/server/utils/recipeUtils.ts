import { questionService } from "@/api/questionServices";
import strapiClient from "@/lib/clients/strapi";
import { Question } from "@/types/questions";
import { RecipeResponse } from "@/types/recipes";

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
    console.log("Question", question.options);
    console.log("Selected Option", options);

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
  userAnswers: Record<string, string | string[]>
): Promise<RecipeResponse> => {
  const questionsResponse = await questionService.getQuestions();
  const questions = questionsResponse.data || [];

  if (!questions.length) {
    throw new Error("Failed to fetch questions data");
  }

  const queryParams = buildFilterQuery(userAnswers, questions);

  return await fetchFilteredRecipes(queryParams);
};

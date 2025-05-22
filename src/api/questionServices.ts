import strapiClient from "@/lib/clients/strapi";
import { Question } from "@/types/questions";

export type QuestionResponse = {
  data: Question[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

// key = question tier,value = how many questions to show of that tier
const tierWeights: { [key: number]: number } = {
  1: 1,
  2: 2,
  3: 3,
  4: 1,
  5: 1,
};

const weightedRandomSelection = (questions: Question[], count: number = 6) => {
  const weightedPool: Question[] = [];

  questions.forEach((q) => {
    const weight = tierWeights[q.tier] || 1;
    for (let i = 0; i < weight; i++) {
      weightedPool.push(q);
    }
  });

  const shuffled = weightedPool.sort(() => Math.random() - 0.5);
  const unique = [];
  const seenIds = new Set();

  for (const q of shuffled) {
    if (!seenIds.has(q.id)) {
      unique.push(q);
      seenIds.add(q.id);
    }
    if (unique.length === count) break;
  }

  return unique;
};

export const questionService = {
  getQuestions: async (): Promise<QuestionResponse> => {
    try {
      const response = await strapiClient.get(
        "/questions?populate[options][populate]=categories"
      );
      //! Response logging TO BE REMOVED
      // console.log(response.data);

      const randomQuestionSelection = weightedRandomSelection(
        response.data.data,
        4
      );
      return {
        data: randomQuestionSelection,
        meta: response.data.meta,
      };
    } catch (error) {
      console.error("Error fetching questions:", error);
      throw error;
    }
  },
};

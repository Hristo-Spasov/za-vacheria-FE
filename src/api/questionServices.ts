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

export const questionService = {
  getQuestions: async (): Promise<QuestionResponse> => {
    try {
      const response = await strapiClient.get(
        "/questions?populate[options][populate]=categories"
      );
      //! Response logging TO BE REMOVED
      console.log(response.data);
      return response.data || [];
    } catch (error) {
      console.error("Error fetching questions:", error);
      return {
        data: [],
        meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } },
      };
    }
  },
};

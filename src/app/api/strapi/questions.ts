import strapiClient from "@/app/utils/fetchClient";
import { QuestionResponse } from "./types/questions";

export const getQuestions = async (): Promise<QuestionResponse> => {
  try {
    const response = await strapiClient.get("/questions?populate=*");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return {
      data: [],
      meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } },
    };
  }
};

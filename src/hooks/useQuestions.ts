import { useQuery } from "@tanstack/react-query";
import { questionService } from "@/api/questionServices";
import { QuestionResponse } from "@/api/questionServices";

export const useQuestions = () => {
  return useQuery<QuestionResponse, Error>({
    queryKey: ["questions"],
    queryFn: questionService.getQuestions,
  });
};

import { useQuery } from "@tanstack/react-query";
import { QuestionResponse } from "@/api/questionServices";

export const useQuestions = () => {
  return useQuery<QuestionResponse, Error>({
    queryKey: ["questions"],
    queryFn: async () => {
      const response = await fetch("/api/questions");
      if (!response.ok) throw new Error("Failed to fetch questions");
      return response.json();
    }
  });
};

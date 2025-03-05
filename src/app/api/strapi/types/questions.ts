export type Option = {
  id: number;
  option: string;
};

export type Question = {
  documentId: string;
  id: number;
  question: string;
  multiSelect: boolean;
  options: Option[];
};

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

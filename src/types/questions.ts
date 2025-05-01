interface Category {
  id: number;
  documentId?: string;
  name?: string;
}

export type Option = {
  id: number;
  option: string;
  filterType?: "field" | "category" | "none";
  filterField?: string;
  filterOperator?: string;
  filterValue?: string;
  categories?: Category[];
};

export type Question = {
  documentId: string;
  id: number;
  question: string;
  multiSelect: boolean;
  options: Option[];
};

export type UserAnswers = Record<string, string | string[]>;

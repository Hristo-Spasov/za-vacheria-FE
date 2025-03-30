export type RecipeResponse = {
  data: Recipe[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
interface Category {
  id: number;
  name: string;
  slug?: string;
}
export type Recipe = {
  id: number;
  documentId: string;
  title: string;
  instructions: string;
  prepTime: number;
  cookingTime: number;
  totalTime: number;
  difficultyLevel: DifficultyLevel;
  ratings?: number;
  ingredients: Ingredient[];
  image: RecipeImage[];
  categories: Category[];
};
interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: Unit;
  preparation?: string;
  raw_text?: string;
}
interface Unit {
  id: number;
  name: string;
  identifier: string;
}
interface DifficultyLevel {
  id: number;
  name: string;
  identifier: string;
}
interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null | string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}
interface RecipeImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width: number;
  height: number;
  formats: {
    large: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    thumbnail: ImageFormat;
  };
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  url?: string;
  previewUrl?: string | null;
  provider?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

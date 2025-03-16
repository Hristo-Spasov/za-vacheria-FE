import { Recipe } from "@/types/recipes";

interface getImageUrlProps {
  recipe: Recipe;
}

const baseUrl = "http://localhost:1337";

export const getImageUrl = ({ recipe }: getImageUrlProps) => {
  if (!recipe.image || recipe.image.length === 0) {
    return {
      url: "/default-recipe-image.jpg",
      width: 500,
      height: 300,
    };
  }

  const image = recipe.image[0];

  const formatOrder = ["large", "medium", "small"] as const;

  if (image.formats) {
    for (const format of formatOrder) {
      if (image.formats[format]) {
        return {
          url: `${baseUrl}${image.formats[format].url}`,
          width: image.formats[format].width,
          height: image.formats[format].height,
        };
      }
    }
  }

  // Fallback to original
  return {
    url: `${baseUrl}${image.url}`,
    width: image.width,
    height: image.height,
  };
};

export const formatNameForUrl = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

import { Recipe } from "@/types/recipes";

/**
 * Converts minutes to ISO 8601 duration format (PT#M)
 */
function minutesToISO8601(minutes: number): string {
  return `PT${minutes}M`;
}

/**
 * Generates JSON-LD structured data for a recipe following Schema.org Recipe markup
 */
export function generateRecipeStructuredData(recipe: Recipe): object {
  const { url: imageUrl } = getImageUrl({ recipe });

  // Format ingredients
  const recipeIngredients = recipe.ingredients.map((ingredient) => {
    const quantity = ingredient.quantity ? `${ingredient.quantity} ` : "";
    const unit = ingredient.unit?.identifier ? `${ingredient.unit.identifier} ` : "";
    const name = ingredient.name || "";
    const preparation = ingredient.preparation ? `, ${ingredient.preparation}` : "";
    return `${quantity}${unit}${name}${preparation}`.trim();
  });

  // Format categories/keywords
  const keywords = recipe.categories?.map((cat) => cat.name).join(", ") || "";

  // Format instructions - take first 160 chars for description
  const description = recipe.instructions.slice(0, 160) || `Открийте как да приготвите ${recipe.title}.`;

  // Calculate times
  const prepTime = recipe.prepTime ? minutesToISO8601(recipe.prepTime) : undefined;
  const cookTime = recipe.cookingTime ? minutesToISO8601(recipe.cookingTime) : undefined;
  const totalTime = recipe.totalTime
    ? minutesToISO8601(recipe.totalTime)
    : recipe.prepTime && recipe.cookingTime
      ? minutesToISO8601(recipe.prepTime + recipe.cookingTime)
      : undefined;

  const structuredData: {
    "@context": string;
    "@type": string;
    name: string;
    image: string;
    description: string;
    recipeIngredient: string[];
    recipeCategory: string[];
    keywords: string;
    author: {
      "@type": string;
      name: string;
    };
    prepTime?: string;
    cookTime?: string;
    totalTime?: string;
    datePublished?: string;
  } = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    image: imageUrl,
    description: description,
    recipeIngredient: recipeIngredients,
    recipeCategory: recipe.categories?.map((cat) => cat.name) || [],
    keywords: keywords,
    author: {
      "@type": "Organization",
      name: "За Вечеря",
    },
  };

  // Add optional fields only if they exist
  if (prepTime) structuredData.prepTime = prepTime;
  if (cookTime) structuredData.cookTime = cookTime;
  if (totalTime) structuredData.totalTime = totalTime;
  if (recipe.publishedAt) structuredData.datePublished = recipe.publishedAt;

  return structuredData;
}

/**
 * Helper function to get image URL from recipe
 */
function getImageUrl({ recipe }: { recipe: Recipe }): { url: string } {
  if (recipe.image && recipe.image.length > 0) {
    const image = recipe.image[0];
    // Prefer medium format, fallback to large, small, or thumbnail
    const format = image.formats?.medium || image.formats?.large || image.formats?.small || image.formats?.thumbnail;
    if (format?.url) {
      return { url: format.url };
    }
    if (image.url) {
      return { url: image.url };
    }
  }
  return { url: "/default_fallback_pic.png" };
}
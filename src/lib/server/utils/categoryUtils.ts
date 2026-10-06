import strapiClient from "@/lib/clients/strapi";
import { Category, Recipe, RecipeResponse } from "@/types/recipes";
import { formatNameForUrl } from "@/components/ui/utils/helpers";

export interface CategoryWithSlug extends Category {
  slug: string;
}

/**
 * Fetches all categories that have recipes, with slugs generated from names.
 * Only populates recipe ids so the response stays small.
 */
export async function getAllCategories(): Promise<CategoryWithSlug[]> {
  try {
    const res = await strapiClient.get(
      "/categories?filters[recipes][$notNull]=true&fields[0]=name&fields[1]=documentId&populate[recipes][fields][0]=id"
    );
    const categories: Category[] = res.data.data;

    return categories
      .map((cat) => ({
        ...cat,
        slug: formatNameForUrl(cat.name),
      }))
      .filter((cat) => cat.slug.length > 0);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

/**
 * Finds a category by its URL slug.
 */
export async function getCategoryBySlug(
  slug: string
): Promise<CategoryWithSlug | null> {
  const categories = await getAllCategories();
  return categories.find((cat) => cat.slug === slug) || null;
}

/**
 * Fetches recipes for a category, paginated, newest first.
 */
export async function fetchCategoryRecipes(
  categoryId: number,
  page = 1,
  pageSize = 30
): Promise<RecipeResponse> {
  try {
    const res = await strapiClient.get(
      `/recipes?filters[categories][id][$eq]=${categoryId}&sort[0]=updatedAt&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching recipes for category:", error);
    return { data: [], meta: { pagination: { page: 1, pageSize, pageCount: 1, total: 0 } } };
  }
}

/**
 * Fetches the quickest recipes in a category (for the "top picks" strip).
 */
export async function fetchQuickestCategoryRecipes(
  categoryId: number,
  count = 3
): Promise<Recipe[]> {
  try {
    const res = await strapiClient.get(
      `/recipes?filters[categories][id][$eq]=${categoryId}&sort[0]=totalTime:asc&pagination[page]=1&pagination[pageSize]=${count}&populate=*`
    );
    return res.data.data;
  } catch (error) {
    console.error("Error fetching quickest recipes for category:", error);
    return [];
  }
}

/**
 * Builds the SEO intro paragraph for a category page from data.
 */
export function buildCategoryIntro(category: CategoryWithSlug): string {
  const count = category.recipes?.length ?? 0;
  return `Разгледайте ${count} рецепти за ${category.name.toLowerCase()} - подредени от най-новите, с време за приготвяне и ниво на трудност за всяка рецепта. Изберете рецепта и започнете да готвите още днес.`;
}

/**
 * Builds templated FAQ items for a category page from data.
 */
export function buildCategoryFaq(
  category: CategoryWithSlug,
  quickest: Recipe[]
): { question: string; answer: string }[] {
  const count = category.recipes?.length ?? 0;
  const faq: { question: string; answer: string }[] = [
    {
      question: `Колко рецепти за ${category.name.toLowerCase()} има в „За Вечеря“?`,
      answer: `В момента предлагаме ${count} рецепти за ${category.name.toLowerCase()}, като постоянно добавяме нови.`,
    },
    {
      question: `Мога ли да намеря лесни рецепти за ${category.name.toLowerCase()}?`,
      answer: `Да - всяка рецепта показва нивото на трудност и общото време за приготвяне, така че лесно да изберете рецепта, съобразена с възможностите и времето ви.`,
    },
  ];

  if (quickest.length > 0) {
    const quickestList = quickest
      .map((r) => {
        const time = r.totalTime || r.prepTime + r.cookingTime;
        return `${r.title} (${time} мин)`;
      })
      .join(", ");
    faq.push({
      question: `Кои са най-бързите рецепти за ${category.name.toLowerCase()}?`,
      answer: `Най-бързите са: ${quickestList}. Всяка рецепта показва точното време за приготвяне.`,
    });
  }

  return faq;
}

/**
 * Builds FAQPage JSON-LD structured data for a category page.
 */
export function buildCategoryFaqJsonLd(
  faq: { question: string; answer: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
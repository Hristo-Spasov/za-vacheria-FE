import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AlternativeRecipeCard from "@/components/AlternativeRecipeCard";
import { formatNameForUrl } from "@/components/ui/utils/helpers";
import {
  buildCategoryFaq,
  buildCategoryFaqJsonLd,
  buildCategoryIntro,
  fetchCategoryRecipes,
  fetchQuickestCategoryRecipes,
  getAllCategories,
  getCategoryBySlug,
} from "@/lib/server/utils/categoryUtils";

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
};

const PAGE_SIZE = 30;

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Категорията не е намерена",
      description: "Поисканата категория не е намерена.",
    };
  }

  const count = category.recipes?.length ?? 0;
  const title = `${category.name} – рецепти`;
  const description = `${count} рецепти за ${category.name.toLowerCase()} с време за приготвяне и трудност. Намерете идеята за следващата си вечеря с „За Вечеря“.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/recepti/${category.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "За Вечеря",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { category: slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const category = await getCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  const [recipeResponse, quickest, allCategories] = await Promise.all([
    fetchCategoryRecipes(category.id, page, PAGE_SIZE),
    fetchQuickestCategoryRecipes(category.id, 3),
    getAllCategories(),
  ]);

  const { data: recipes, meta } = recipeResponse;
  const pageCount = meta.pagination.pageCount;
  const intro = buildCategoryIntro(category);
  const faq = buildCategoryFaq(category, quickest);
  const faqJsonLd = buildCategoryFaqJsonLd(faq);
  const otherCategories = allCategories.filter((c) => c.id !== category.id);

  return (
    <div className="max-w-5xl mx-auto p-4 py-8">
      <script
        id="category-faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Header */}
      <header className="mb-8">
        <nav aria-label="Хлебни трохи" className="text-sm text-orange-700 mb-2">
          <Link href="/" className="hover:underline">
            Начало
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">Рецепти за {category.name}</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold text-orange-800 mb-3">
          {category.name} – рецепти
        </h1>
        <p className="text-gray-700 text-lg max-w-3xl">{intro}</p>
      </header>

      {/* Top quickest recipes */}
      {quickest.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-orange-800 mb-4">
            Най-бързите рецепти за {category.name.toLowerCase()}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickest.map((recipe) => {
              const time =
                recipe.totalTime || recipe.prepTime + recipe.cookingTime;
              return (
                <li
                  key={recipe.documentId}
                  className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-1 rounded-full mb-2">
                      {time} мин
                    </span>
                    <h3 className="font-bold text-gray-800">{recipe.title}</h3>
                  </div>
                  <Link
                    href={`/recipe/${recipe.documentId}/${formatNameForUrl(
                      recipe.title
                    )}?from=${encodeURIComponent(`/recepti/${category.slug}`)}`}
                    className="text-orange-600 hover:text-orange-700 text-sm font-medium mt-3"
                  >
                    Виж рецептата →
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
{/* Recipe grid */}
      <section>
        <h2 className="text-2xl font-bold text-orange-800 mb-4">
          Всички рецепти за {category.name.toLowerCase()}
        </h2>
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map((recipe, i) => (
              <AlternativeRecipeCard
                key={recipe.documentId}
                recipe={recipe}
                idx={i}
                from={`/recepti/${category.slug}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600 py-8">
            Няма намерени рецепти в тази категория.
          </p>
        )}

        {/* Pagination */}
        {pageCount > 1 && (
          <nav
            aria-label="Пагинация"
            className="flex justify-between items-center mt-8"
          >
            {page > 1 ? (
              <Link
                href={`/recepti/${category.slug}?page=${page - 1}`}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg"
              >
                ← Предишна страница
              </Link>
            ) : (
              <span />
            )}
            <span className="text-gray-600 text-sm">
              Страница {page} от {pageCount}
            </span>
            {page < pageCount ? (
              <Link
                href={`/recepti/${category.slug}?page=${page + 1}`}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg"
              >
                Следваща страница →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </section>

      {/* FAQ */}
      <section className="mt-12 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-orange-800 mb-4">
          Често задавани въпроси
        </h2>
        <dl className="space-y-4">
          {faq.map((item) => (
            <div key={item.question}>
              <dt className="font-semibold text-gray-800">{item.question}</dt>
              <dd className="text-gray-700 mt-1">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Related categories */}
      {otherCategories.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-orange-800 mb-4">
            Други категории
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/recepti/${cat.slug}`}
                className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

import { getRecipeById } from "@/lib/server/utils/recipeUtils";
import { getImageUrl } from "@/components/ui/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ActionButton from "@/components/ui/buttons/ActionButton";
import { Metadata } from "next";
import ImageDisclaimer from "@/components/recipePageUI/ImageDisclaimer";
import RecipeDesktopLayout from "@/components/recipePageUI/DesktopView/RecipeDesktopLayout";
import RecipeMobileLayout from "@/components/recipePageUI/MobileView/RecipeMobileLayout";
import RecipeMobileHeader from "@/components/recipePageUI/MobileView/RecipeMobileHeader";
import RecipeDesktopHeader from "@/components/recipePageUI/DesktopView/RecipeDesktopHeader";
import RecipeCookingDetailsMobile from "@/components/recipePageUI/MobileView/RecipeCookingDetailsMobile";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    return {
      title: "Рецепта не е намерена",
      description: "Поисканата рецепта не е намерена.",
    };
  }

  const { url: imageUrl } = getImageUrl({ recipe });

  return {
    title: `${recipe.title} - За Вечеря`,
    description:
      recipe.instructions.slice(0, 160) ||
      `Открийте как да приготвите ${recipe.title}.`,
    openGraph: {
      title: `${recipe.title} - За Вечеря`,
      description:
        recipe.instructions.slice(0, 160) ||
        `Открийте как да приготвите ${recipe.title}.`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: recipe.title,
        },
      ],
      type: "article",
      siteName: "За Вечеря",
    },
    twitter: {
      card: "summary_large_image",
      title: `${recipe.title} - За Вачерия`,
      description:
        recipe.instructions.slice(0, 160) ||
        `Открийте как да приготвите ${recipe.title}.`,
      images: [imageUrl],
    },
  };
}

export default async function RecipePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ session: string; showMore?: string }>;
}) {
  const { id } = await params;
  const { session, showMore } = await searchParams;

  try {
    const recipe = await getRecipeById(id);

    if (!recipe) {
      return notFound();
    }

    const { url, width, height } = getImageUrl({ recipe });

    return (
      <div className="bg-gradient-to-b from-amber-50 to-orange-100 min-h-screen relative">
        {/* food pattern overlay */}
        <div className="absolute inset-0 bg-[url('/subtle-food-pattern.webp')] opacity-10"></div>

        <div className="max-w-5xl mx-auto p-3 sm:p-4 py-6 sm:py-10 relative z-10">
          {/* Back button */}
          <Link
            href={
              showMore === "true"
                ? `/recipeResult?session=${session}&showMore=true`
                : `/recipeResult?session=${session}`
            }
            className="inline-flex items-center text-orange-800 mb-4 sm:mb-6 hover:text-orange-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Обратно към резултатите
          </Link>

          {/* Recipe Card */}
          <div className="p-4 sm:p-6 md:p-8 bg-white backdrop-blur-sm rounded-xl shadow-lg">
            {/* Recipe header for mobile */}
            <RecipeMobileHeader recipe={recipe} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {/* Recipe image */}
              <div className="rounded-lg overflow-hidden shadow-lg max-h-[250px] sm:max-h-[300px] md:max-h-none">
                <Image
                  src={url}
                  alt={recipe.title}
                  width={width}
                  height={height}
                  className="w-full h-full object-cover object-center"
                  priority
                />
              </div>
              {/* Recipe header for desktop */}
              <RecipeDesktopHeader recipe={recipe} />
              <ImageDisclaimer />
            </div>
            {/* Cooking details for mobile */}
            <RecipeCookingDetailsMobile recipe={recipe} />
            {/* Mobile layout */}
            <RecipeMobileLayout recipe={recipe} />
            {/* Desktop layout */}
            <RecipeDesktopLayout recipe={recipe} />
          </div>

          {/* Action buttons */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <ActionButton
              route={
                showMore === "true"
                  ? `/recipeResult?session=${session}&showMore=true`
                  : `/recipeResult?session=${session}`
              }
              text="Обратно към резултатите"
            />
            <ActionButton route="/questions" text="Повторете въпросника" />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return notFound();
  }
}

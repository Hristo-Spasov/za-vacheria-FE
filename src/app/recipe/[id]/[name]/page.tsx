import { getRecipeById } from "@/lib/server/utils/recipeUtils";
import { getImageUrl } from "@/components/ui/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ActionButton from "@/components/ui/buttons/ActionButton";

export default async function RecipePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  try {
    const recipe = await getRecipeById(id);

    if (!recipe) {
      return notFound();
    }

    const { url, width, height } = getImageUrl({ recipe });

    return (
      <div className="bg-gradient-to-b from-amber-50 to-orange-100 min-h-screen relative">
        {/* food pattern overlay */}
        <div className="absolute inset-0 bg-[url('/subtle-food-pattern.png')] opacity-10"></div>

        <div className="max-w-5xl mx-auto p-3 sm:p-4 py-6 sm:py-10 relative z-10">
          {/* Back button */}
          <Link
            href="/recipeResult"
            className="inline-flex items-center text-orange-800 mb-4 sm:mb-6 hover:text-orange-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
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
            <div className="md:hidden mb-4">
              <h1 className="text-2xl font-bold text-orange-800 mb-2">
                {recipe.title}
              </h1>
              <div className="flex flex-wrap gap-1 mb-3">
                {recipe.categories.map((category) => (
                  <span
                    key={category.id}
                    className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>

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
              <div className="hidden md:block mb-8">
                <h1 className="text-3xl font-bold text-orange-800 mb-2">
                  {recipe.title}
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  {recipe.categories.map((category) => (
                    <span
                      key={category.id}
                      className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-4">
                  {recipe.prepTime > 0 && (
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1 text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Подготвяне: {recipe.prepTime} мин</span>
                    </div>
                  )}
                  {recipe.cookingTime > 0 && (
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1 text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Готвене: {recipe.cookingTime} мин</span>
                    </div>
                  )}

                  {recipe.totalTime > 0 && (
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1 text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Общо: {recipe.totalTime} мин</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span>Трудност: {recipe.difficultyLevel.name}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cooking details for mobile */}
            <div className="md:hidden mt-2 mb-6">
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                {recipe.prepTime > 0 && (
                  <div className="flex items-center bg-orange-100 p-2 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Подготвяне: {recipe.prepTime} мин</span>
                  </div>
                )}
                {recipe.cookingTime > 0 && (
                  <div className="flex items-center bg-orange-100 p-2 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Готвене: {recipe.cookingTime} мин</span>
                  </div>
                )}
                {recipe.totalTime > 0 && (
                  <div className="flex items-center bg-orange-100 p-2 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Общо: {recipe.totalTime} мин</span>
                  </div>
                )}
                <div className="flex items-center bg-orange-100 p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span>Трудност: {recipe.difficultyLevel.name}</span>
                </div>
              </div>
            </div>

            {/* Mobile layout */}
            <div className="md:hidden mt-6">
              {/* Ingredients for mobile */}
              <div className="bg-orange-100 p-4 rounded-lg mb-6">
                <h2 className="text-lg font-bold text-orange-800 mb-3">
                  Продукти
                </h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span>
                        {ingredient.quantity &&
                        ingredient.unit?.name &&
                        ingredient.name
                          ? `${ingredient.quantity} ${ingredient.unit?.name} ${ingredient.name}`
                          : ingredient.raw_text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions for mobile */}
              <div>
                <h2 className="text-lg font-bold text-orange-800 mb-3">
                  Начин на приготвяне
                </h2>
                <div className="prose prose-orange max-w-none text-sm">
                  <p className="mb-4 whitespace-pre-wrap">
                    {recipe.instructions}
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop layout */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 mt-8">
              {/* Ingredients */}
              <div>
                <h2 className="text-xl font-bold text-orange-800 mb-4">
                  Продукти
                </h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span>
                        {ingredient.quantity &&
                        ingredient.unit?.name &&
                        ingredient.name
                          ? `${ingredient.quantity} ${ingredient.unit?.name} ${ingredient.name}`
                          : ingredient.raw_text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-bold text-orange-800 mb-4">
                  Начин на приготвяне
                </h2>
                <div className="prose prose-orange max-w-none">
                  <p className="mb-4 whitespace-pre-wrap">
                    {recipe.instructions}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <ActionButton
              route="/recipeResult"
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

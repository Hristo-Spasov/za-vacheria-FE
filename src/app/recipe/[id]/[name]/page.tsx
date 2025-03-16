import { getRecipeById } from "@/lib/server/utils/recipeUtils";
import { getImageUrl } from "@/components/ui/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function RecipePage({
  params,
}: {
  params: { id: string };
}) {
  console.log(params);
  const { id } = params;

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

        <div className="max-w-4xl mx-auto p-4 py-10 relative z-10">
          {/* Back button */}
          <Link
            href="/recipeResult"
            className="inline-flex items-center text-orange-800 mb-6 hover:text-orange-600"
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
            Back to results
          </Link>

          {/* Recipe header */}
          <div className="mb-8">
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
                <span>Prep: {recipe.prepTime} min</span>
              </div>
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
                <span>Cook: {recipe.cookingTime} min</span>
              </div>
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
                <span>Total: {recipe.totalTime} min</span>
              </div>
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
                <span>Difficulty: {recipe.difficultyLevel}</span>
              </div>
            </div>
          </div>

          {/* Recipe image */}
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={url}
              alt={recipe.title}
              width={width}
              height={height}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Recipe content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Ingredients */}
            <div className="md:col-span-1">
              <h2 className="text-xl font-bold text-orange-800 mb-4">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>
                      {ingredient.quantity} {ingredient.unit} {ingredient.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold text-orange-800 mb-4">
                Instructions
              </h2>
              <div className="prose prose-orange max-w-none">
                {recipe.instructions.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/recipeResult"
              className="bg-white hover:bg-orange-50 text-orange-800 font-medium py-2 px-8 border border-orange-300 rounded-full shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
            >
              <span>Back to results</span>
            </Link>
            <Link
              href="/questions"
              className="bg-white hover:bg-orange-50 text-orange-800 font-medium py-2 px-8 border border-orange-300 rounded-full shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
            >
              <span>Retake the quiz</span>
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return notFound();
  }
}

import MainRecipeCard from "@/components/MainRecipeCard";
import AlternativeRecipeCard from "@/components/AlternativeRecipeCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getRecipesFromUserAnswers } from "@/lib/server/utils/recipeUtils";
import Link from "next/link";
import ActionButton from "@/components/ui/buttons/ActionButton";
import { getRecipeSubset, shuffleRecipes } from "@/components/ui/utils/helpers";
import { Recipe } from "@/types/recipes";
import ShuffleButton from "@/components/ui/buttons/ShuffleButton";

const Page = async ({
  searchParams,
}: {
  searchParams: { shuffle?: string; seed?: string };
}) => {
  const cookieStore = await cookies();
  const userAnswersCookie = cookieStore.get("userAnswers");

  if (!userAnswersCookie?.value) {
    redirect("/questions");
  }

  const userAnswers = JSON.parse(userAnswersCookie.value);

  const recipesResponse = await getRecipesFromUserAnswers(userAnswers);
  const allRecipes = recipesResponse.data || [];

  let recipes: Recipe[] = [];

  if (searchParams.shuffle === "true") {
    recipes = shuffleRecipes(allRecipes);
  } else {
    recipes = getRecipeSubset(allRecipes, 4);
  }

  // const recipes = shuffleRecipes(recipesResponse.data) || [];

  const altRecipes = recipes.length > 1 ? recipes.slice(1) : [];

  console.log("User answers from cookie:", userAnswers);
  console.log("Raw recipe response:", recipesResponse);
  console.log("Recipe being passed to MainRecipeCard:", recipes[0]);

  return (
    <>
      {recipes.length > 0 ? (
        <div className="bg-gradient-to-b from-amber-50 to-orange-100 min-h-screen relative">
          {/* food pattern overlay */}
          <div className="absolute inset-0 bg-[url('/subtle-food-pattern.png')] opacity-10"></div>

          <div className="max-w-4xl mx-auto p-4 py-10 relative z-10">
            {/* Main Recipe Card */}
            <MainRecipeCard recipe={recipes[0]} />

            {/* Alternative Recipes Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-orange-800">
                  <span className="mr-2">✨</span>
                  Други Рецепти,Които Може Да Ви Харесат
                </h3>
                <ShuffleButton />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Alternative Recipe Cards (3) */}
                {altRecipes.map((recipe, i) => (
                  <AlternativeRecipeCard key={i} recipe={recipe} idx={i} />
                ))}
              </div>
            </div>

            {/* See More Button */}
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <ActionButton
                route="/questions"
                text="Отговорете на въпросника отново?"
              />
              <ActionButton route="/" text="Открийте Други Рецепти" />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center p-8">
          <h2>
            Няма намерени рецепти,които да отговарят на вашите предпочитания
          </h2>
          <Link
            href="/questions"
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full inline-block"
          >
            Опитайте отново
          </Link>
        </div>
      )}
    </>
  );
};

export default Page;

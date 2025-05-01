import MainRecipeCard from "@/components/MainRecipeCard";
import AlternativeRecipeCard from "@/components/AlternativeRecipeCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getRecipesFromUserAnswers } from "@/lib/server/utils/recipeUtils";
import ActionButton from "@/components/ui/buttons/ActionButton";
import { getRecipeSubset } from "@/components/ui/utils/helpers";
import { Recipe } from "@/types/recipes";
import { v4 as uuidv4 } from "uuid";
import ShowMoreButton from "@/components/ui/buttons/ShowMoreButton";
import NoRecipesFound from "@/components/NoRecipesFound";
const Page = async ({
  searchParams,
}: {
  searchParams: { showMore: string; session?: string };
}) => {
  const cookieStore = await cookies();
  const userAnswersCookie = cookieStore.get("userAnswers");
  const { session, showMore } = await searchParams;

  if (!userAnswersCookie?.value) {
    redirect("/questions");
  }

  const sessionId = session || uuidv4();
  const userAnswers = JSON.parse(userAnswersCookie.value);

  if (!searchParams.session) {
    redirect(`/recipeResult?session=${sessionId}`);
  }
  const recipesResponse = await getRecipesFromUserAnswers(
    userAnswers,
    sessionId
  );
  const allRecipes = recipesResponse.data || [];
  const mainRecipe = allRecipes[0];

  let recipes: Recipe[] = [];

  if (showMore === "true") {
    recipes = allRecipes;
  } else {
    recipes = getRecipeSubset(allRecipes, 4);
  }

  const altRecipes = allRecipes.length > 1 ? recipes.slice(1) : [];

  //! Debugging purposes only
  // console.log("Alternative recipes count:", altRecipes.length);
  // console.log("User answers from cookie:", userAnswers);
  // console.log("Raw recipe response:", recipesResponse);
  // console.log("Recipe being passed to MainRecipeCard:", mainRecipe);

  return (
    <>
      {allRecipes.length > 0 ? (
        <div className="bg-gradient-to-b from-amber-50 to-orange-100 min-h-screen relative">
          {/* food pattern overlay */}
          <div className="absolute inset-0 bg-[url('/subtle-food-pattern.png')] opacity-10"></div>

          <div className="max-w-4xl mx-auto p-4 py-10 relative z-10">
            {/* Main Recipe Card */}
            <MainRecipeCard
              recipe={mainRecipe}
              session={sessionId}
              showMore={showMore}
            />

            {/* Alternative Recipes Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-orange-800">
                  <span className="mr-2">✨</span>
                  Други Рецепти,Които Може Да Ви Харесат
                </h3>
                <ShowMoreButton session={sessionId} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Alternative Recipe Cards (3) */}
                {altRecipes.map((recipe, i) => (
                  <AlternativeRecipeCard
                    key={i}
                    recipe={recipe}
                    idx={i}
                    session={sessionId}
                    showMore={showMore}
                  />
                ))}
              </div>
            </div>

            {/* See More Button */}
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <ActionButton
                route="/questions"
                text="Отговорете на въпросника отново?"
              />
              {/* BUTTON for the main page with recipes for future implementation */}
              {/* <ActionButton route="/" text="Открийте Други Рецепти" /> */}
            </div>
          </div>
        </div>
      ) : (
        <NoRecipesFound />
      )}
    </>
  );
};

export default Page;

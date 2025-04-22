import Image from "next/image";
import { Recipe } from "@/types/recipes";
import { getImageUrl, formatNameForUrl } from "./ui/utils/helpers";
import CardButton from "./ui/buttons/CardButton";

interface MainRecipeCardProps {
  recipe: Recipe;
}

const MainRecipeCard = ({ recipe }: MainRecipeCardProps) => {
  const { url, width, height } = getImageUrl({ recipe });

  const displayCategories = recipe.categories?.slice(0, 3) || [];
  const remainingCount =
    (recipe.categories?.length || 0) - displayCategories.length;

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
      {/* Background gradient wrapper */}
      <div className="relative">
        <div className="md:grid md:grid-cols-2 overflow-hidden">
          {/* Image section */}
          <div className="relative h-64 md:h-full overflow-hidden group">
            <Image
              src={url}
              alt={recipe.image[0].alternativeText || recipe.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              width={width}
              height={height}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent "></div>
            <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md transform rotate-2 group-hover:[animation:var(--animate-bell-ring)] ">
              Перфектно Съвпадение!
            </div>
          </div>

          {/* Content section */}
          <div className="relative p-6 md:p-8 bg-white/95 backdrop-blur-sm">
            <h2 className="mt-2 text-3xl font-bold text-orange-700 border-b-2 border-orange-300 pb-2 inline-block">
              {recipe.title}
            </h2>

            <div className="flex flex-wrap gap-2 mt-4">
              <div className="bg-orange-100 rounded-full px-3 py-1 flex items-center text-orange-700">
                <span className="mr-1">⏱️</span>{" "}
                {recipe.totalTime
                  ? `${recipe.totalTime}m`
                  : `${recipe.prepTime + recipe.cookingTime}m`}
              </div>
              <div className="bg-orange-100 rounded-full px-3 py-1 flex items-center text-orange-700">
                <span className="mr-1">🔥</span> {recipe.difficultyLevel.name}
              </div>
            </div>

            {displayCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {displayCategories.map((category) => (
                  <span
                    key={category.id}
                    className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    <span className="mr-1 text-xs">🍴</span>
                    {category.name}
                  </span>
                ))}
                {remainingCount > 0 && (
                  <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                    +{remainingCount} още
                  </span>
                )}
              </div>
            )}

            <p className="mt-4 text-gray-700 bg-orange-50 p-4 rounded-lg border-l-2 border-orange-300 text-sm leading-relaxed whitespace-pre-wrap">
              {recipe.instructions.slice(0, 150)}...
            </p>

            <CardButton
              route={`/recipe/${recipe.documentId}/${formatNameForUrl(
                recipe.title
              )}`}
              text="Виж пълната рецепта"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainRecipeCard;

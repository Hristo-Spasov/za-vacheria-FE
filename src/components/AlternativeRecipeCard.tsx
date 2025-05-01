import { Recipe } from "@/types/recipes";
import Image from "next/image";
import { formatNameForUrl, getImageUrl } from "./ui/utils/helpers";
import CardButton from "./ui/buttons/CardButton";

interface AlternativeRecipeCardProps {
  recipe: Recipe;
  idx: number;
  session: string;
  showMore?: string;
}

const AlternativeRecipeCard = ({
  recipe,
  idx,
  session,
  showMore,
}: AlternativeRecipeCardProps) => {
  const { url, width, height } = getImageUrl({ recipe });

  const totalTime = recipe.totalTime
    ? recipe.totalTime
    : recipe.prepTime + recipe.cookingTime;
  return (
    <div className="group relative h-[320px] rounded-xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={url}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          width={width}
          height={height}
          alt={
            Array.isArray(recipe.image) && recipe.image[idx]?.alternativeText
              ? recipe.image[idx].alternativeText
              : recipe.title
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 group-hover:from-black/90"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 h-full flex flex-col justify-between p-5 text-white">
        {/* Top metadata */}
        <div className="flex justify-between items-start">
          <span className="bg-orange-500/90 px-3 py-1 rounded-full text-xs font-medium">
            {recipe.difficultyLevel.name}
          </span>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium flex items-center">
            ⏱️ {totalTime}м
          </span>
        </div>

        {/* Bottom content */}
        <div>
          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-200 transition-colors">
            {recipe.title}
          </h3>

          <CardButton
            route={`/recipe/${recipe.documentId}/${formatNameForUrl(
              recipe.title
            )}?session=${session}${showMore ? "&showMore=true" : ""}`}
            text="Виж рецептата"
            variant="alternative"
          />
        </div>
      </div>
    </div>
  );
};

export default AlternativeRecipeCard;

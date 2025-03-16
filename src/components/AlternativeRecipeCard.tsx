import { Recipe } from "@/types/recipes";
import Image from "next/image";
import { formatNameForUrl, getImageUrl } from "./ui/utils/helpers";
import Link from "next/link";

interface AlternativeRecipeCardProps {
  recipe: Recipe;
  idx: number;
}

const AlternativeRecipeCard = ({ recipe, idx }: AlternativeRecipeCardProps) => {
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
          alt={recipe.image[idx]?.alternativeText || recipe.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 group-hover:from-black/90"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 h-full flex flex-col justify-between p-5 text-white">
        {/* Top metadata */}
        <div className="flex justify-between items-start">
          <span className="bg-orange-500/90 px-3 py-1 rounded-full text-xs font-medium">
            {recipe.difficultyLevel}
          </span>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium flex items-center">
            ⏱️ {totalTime}m
          </span>
        </div>

        {/* Bottom content */}
        <div>
          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-200 transition-colors">
            {recipe.title}
          </h3>

          <Link
            href={`/recipe/${recipe.documentId}/${formatNameForUrl(
              recipe.title
            )}`}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 colors flex items-center justify-center gap-1 transform group-hover:translate-y-0 translate-y-1 opacity-90 group-hover:opacity-100"
          >
            View Recipe
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AlternativeRecipeCard;

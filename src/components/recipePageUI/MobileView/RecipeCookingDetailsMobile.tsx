import DifficultyDisclaimer from "../DifficultyDisclaimer";
import { Recipe } from "@/types/recipes";

const RecipeCookingDetailsMobile = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="md:hidden mt-2 mb-6">
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
        {recipe.prepTime > 0 && (
          <div className="flex items-center bg-orange-100 p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
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
              stroke="currentColor">
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
              stroke="currentColor">
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
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span className="relative group/difficulty">
            Трудност: {recipe.difficultyLevel.name}
            <span className="md:hidden text-sm opacity-70"> &#9432; </span>
            <DifficultyDisclaimer />
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCookingDetailsMobile;

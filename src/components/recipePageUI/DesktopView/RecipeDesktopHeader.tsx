import { Recipe } from "@/types/recipes";
import DifficultyDisclaimer from "../DifficultyDisclaimer";

const RecipeDesktopHeader = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="hidden md:block mb-8">
      <h1 className="text-3xl font-bold text-orange-800 mb-2">
        {recipe.title}
      </h1>
      <div className="flex flex-wrap gap-2 mb-4">
        {recipe.categories.map((category) => (
          <span
            key={category.id}
            className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
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
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1 text-orange-500"
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
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1 text-orange-500"
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
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1 text-orange-500"
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
            <DifficultyDisclaimer />
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeDesktopHeader;

import { Recipe } from "@/types/recipes";

const recipeDesktopLayout = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="hidden md:grid md:grid-cols-3 gap-8 mt-8">
      {/* Ingredients */}
      <div>
        <h2 className="text-xl font-bold text-orange-800 mb-4">Продукти</h2>
        <ul className="space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>
                {ingredient.quantity && ingredient.unit?.name && ingredient.name
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
          {recipe.instructions
            .split(/\d+\.\s+/)
            .filter((step) => step.trim())
            .map((step, index) => (
              <div key={index} className="flex mb-4">
                <span className="font-bold text-orange-600 mr-3">
                  {index + 1}.
                </span>
                <p>{step.trim()}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default recipeDesktopLayout;

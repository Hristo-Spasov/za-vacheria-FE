import { Recipe } from "@/types/recipes"
const RecipeMobileLayout = ({recipe} : {recipe: Recipe}) => {
  return (
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
  )
}

export default RecipeMobileLayout
import { Recipe } from "@/types/recipes";

const RecipeMobileHeader = ({recipe} : {recipe: Recipe}) => {
  return (
    <div className="md:hidden mb-4">
      <h1 className="text-2xl font-bold text-orange-800 mb-2">
        {recipe.title}
      </h1>
      <div className="flex flex-wrap gap-1 mb-3">
        {recipe.categories.map((category) => (
          <span
            key={category.id}
            className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs">
            {category.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RecipeMobileHeader;

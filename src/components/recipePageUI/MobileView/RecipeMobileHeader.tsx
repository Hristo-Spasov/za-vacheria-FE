import { Recipe } from "@/types/recipes";
import Link from "next/link";
import { formatNameForUrl } from "@/components/ui/utils/helpers";

const RecipeMobileHeader = ({recipe} : {recipe: Recipe}) => {
  return (
    <div className="md:hidden mb-4">
      <h1 className="text-2xl font-bold text-orange-800 mb-2">
        {recipe.title}
      </h1>
      <div className="flex flex-wrap gap-1 mb-3">
        {recipe.categories.map((category) => (
          <Link
            key={category.id}
            href={`/recepti/${formatNameForUrl(category.name)}`}
            className="bg-orange-100 hover:bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full text-xs transition-colors">
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecipeMobileHeader;

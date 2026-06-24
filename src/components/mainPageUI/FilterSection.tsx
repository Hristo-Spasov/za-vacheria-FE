import Searchbar from "../Searchbar";
import AlternativeRecipeCard from "../AlternativeRecipeCard";
import { Recipe } from "@/types/recipes";

const FilterSection = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <section className="flex h-full w-full items-center justify-center p-4 md:p-8">
      {/* Food pattern overlay */}
      <div className="absolute inset-0 bg-[url('/subtle-food-pattern.webp')] opacity-10 isolate pointer-events-none"></div>

      <div className="grid h-full w-full gap-4 grid-cols-1 lg:grid-cols-4 lg:grid-rows-5">
        {/* Sidebar - hidden on mobile, visible on large screens */}
        <aside className="hidden lg:flex lg:col-span-1 lg:row-span-5 bg-gray-200 rounded-lg shadow-md items-center justify-center">
          {/* Sidebar content */}
        </aside>

        {/* Main content area */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-4 lg:row-span-5">
          {/* Search container */}
          <div
            id="card-search-container"
            className=" flex items-center justify-center p-4"
          >
            <Searchbar />
          </div>

          {/* Card container*/}
          <div id="card-container" className=" p-4 overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipes.map((recipe, i) => (
                <AlternativeRecipeCard key={recipe.documentId} recipe={recipe} idx={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;

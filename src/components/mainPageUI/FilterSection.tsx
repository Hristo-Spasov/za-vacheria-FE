"use client";

import { useMemo } from "react";
import Searchbar from "../Searchbar";
import AlternativeRecipeCard from "../AlternativeRecipeCard";
import SidebarFilters from "./sidebarFilters";
import ActiveFilters, { ActiveFilter } from "./filters/ActiveFilters";
import MobileFilterDrawer from "./filters/MobileFilterDrawer";
import { Category, DifficultyLevel, Recipe } from "@/types/recipes";


type FilterSectionProps = {
  recipes: Recipe[];
  categories: Category[];
  difficultyLevels: DifficultyLevel[];
  selectedCategories: number[];
  onCategoriesChange: (selected: number[]) => void;
  searchInput: string;
  onSearchChange: (search: string) => void;
  selectedDifficulties: number[];
  onDifficultiesChange: (selected: number[]) => void;
  selectedTime: number | null;
  onTimeChange: (max: number | null) => void;
  returnUrl: string
};

const FilterSection = ({
  recipes,
  categories,
  difficultyLevels,
  selectedCategories,
  searchInput,
  onSearchChange,
  onCategoriesChange,
  selectedDifficulties,
  onDifficultiesChange,
  selectedTime,
  onTimeChange,
  returnUrl
}: FilterSectionProps) => {
  // Derive lookup maps from real data
  const categoryNameMap = useMemo(() => {
    const map: Record<number, string> = {};
    categories.forEach((c) => { map[c.id] = c.name; });
    return map;
  }, [categories]);

  const difficultyNameMap = useMemo(() => {
    const map: Record<number, string> = {};
    difficultyLevels.forEach((d) => { map[d.id] = d.name; });
    return map;
  }, [difficultyLevels]);

  // Build active filter badges
  const activeFilters = useMemo<ActiveFilter[]>(() => {
    const filters: ActiveFilter[] = [];

    selectedCategories.forEach((id) => {
      if (categoryNameMap[id]) {
        filters.push({ type: "category", label: categoryNameMap[id], value: id });
      }
    });

    selectedDifficulties.forEach((id) => {
      if (difficultyNameMap[id]) {
        filters.push({ type: "difficulty", label: difficultyNameMap[id], value: id });
      }
    });

    if (selectedTime !== null) {
      filters.push({
        type: "time",
        label: `${selectedTime} мин`,
        value: selectedTime,
      });
    }

    return filters;
  }, [selectedCategories, selectedDifficulties, selectedTime, categoryNameMap, difficultyNameMap]);

  const activeFilterCount = activeFilters.length;

  const handleRemoveFilter = (filter: ActiveFilter) => {
    switch (filter.type) {
      case "category":
        onCategoriesChange(selectedCategories.filter((id) => id !== filter.value));
        break;
      case "difficulty":
        onDifficultiesChange(selectedDifficulties.filter((id) => id !== filter.value));
        break;
      case "time":
        onTimeChange(null);
        break;
    }
  };

  const handleClearAll = () => {
    onCategoriesChange([]);
    onDifficultiesChange([]);
    onTimeChange(null);
    onSearchChange("");
  };
  const handleClearInput = () => {
    onSearchChange("");
  };

  return (
    <section className="flex h-full w-full items-center justify-center p-4 md:p-8">
      {/* Food pattern overlay */}
      <div className="absolute inset-0 bg-[url('/subtle-food-pattern.webp')] opacity-10 isolate pointer-events-none"></div>

      <div className="grid h-full w-full gap-4 grid-cols-1 lg:grid-cols-4 lg:grid-rows-5">
        {/* Sidebar - hidden on mobile, visible on large screens */}
        <SidebarFilters
          selectedCategories={selectedCategories}
          onCategoriesChange={onCategoriesChange}
          selectedDifficulties={selectedDifficulties}
          onDifficultiesChange={onDifficultiesChange}
          selectedTime={selectedTime}
          onTimeChange={onTimeChange}
          categories={categories}
          difficultyLevels={difficultyLevels}
        />

        {/* Main content area */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-4 lg:row-span-5">
          {/* Search container + Mobile filter trigger */}
          <div
            id="card-search-container"
            className="flex items-center justify-between gap-3 p-4"
          >
            <div className="flex-1">
              <Searchbar value={searchInput} onChange={onSearchChange} onClear={handleClearInput} />
            </div>
            <MobileFilterDrawer
              selectedCategories={selectedCategories}
              onCategoriesChange={onCategoriesChange}
              selectedDifficulties={selectedDifficulties}
              onDifficultiesChange={onDifficultiesChange}
              selectedTime={selectedTime}
              onTimeChange={onTimeChange}
              activeFilterCount={activeFilterCount}
              onClearAll={handleClearAll}
              categories={categories}
              difficultyLevels={difficultyLevels}
            />
          </div>

          {/* Active filters bar */}
          {activeFilters.length > 0 && (
            <div className="px-4">
              <ActiveFilters
                filters={activeFilters}
                onRemove={handleRemoveFilter}
                onClearAll={handleClearAll}
              />
            </div>
          )}

          {/* Card container */}
          <div id="card-container" className="p-4 overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipes.map((recipe, i) => (
                <AlternativeRecipeCard key={recipe.documentId} recipe={recipe} idx={i} from={returnUrl} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
"use client";

import { useState, useMemo } from "react";
import Searchbar from "../Searchbar";
import AlternativeRecipeCard from "../AlternativeRecipeCard";
import SidebarFilters from "./sidebarFilters";
import ActiveFilters, { ActiveFilter } from "./filters/ActiveFilters";
import MobileFilterDrawer from "./filters/MobileFilterDrawer";
import { Recipe } from "@/types/recipes";

// Placeholder lookup maps — these will be derived from DB data later
const CATEGORY_NAMES: Record<number, string> = {
  1: "Салати",
  2: "Супи",
  3: "Основни",
  4: "Десерти",
  5: "Предястия",
  6: "Напитки",
};

const DIFFICULTY_NAMES: Record<number, string> = {
  1: "Лесно",
  2: "Средно",
  3: "Трудно",
};

const TIME_LABELS: Record<number, string> = {
  15: "до 15 мин",
  30: "до 30 мин",
  60: "до 60 мин",
  [Infinity]: "60+ мин",
};

const FilterSection = ({ recipes }: { recipes: Recipe[] }) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<number[]>([]);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  // Build active filter badges
  const activeFilters = useMemo<ActiveFilter[]>(() => {
    const filters: ActiveFilter[] = [];

    selectedCategories.forEach((id) => {
      if (CATEGORY_NAMES[id]) {
        filters.push({ type: "category", label: CATEGORY_NAMES[id], value: id });
      }
    });

    selectedDifficulties.forEach((id) => {
      if (DIFFICULTY_NAMES[id]) {
        filters.push({ type: "difficulty", label: DIFFICULTY_NAMES[id], value: id });
      }
    });

    if (selectedTime !== null) {
      filters.push({
        type: "time",
        label: TIME_LABELS[selectedTime] ?? `${selectedTime} мин`,
        value: selectedTime,
      });
    }

    return filters;
  }, [selectedCategories, selectedDifficulties, selectedTime]);

  const activeFilterCount = activeFilters.length;

  const handleRemoveFilter = (filter: ActiveFilter) => {
    switch (filter.type) {
      case "category":
        setSelectedCategories((prev) => prev.filter((id) => id !== filter.value));
        break;
      case "difficulty":
        setSelectedDifficulties((prev) => prev.filter((id) => id !== filter.value));
        break;
      case "time":
        setSelectedTime(null);
        break;
    }
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedDifficulties([]);
    setSelectedTime(null);
  };

  return (
    <section className="flex h-full w-full items-center justify-center p-4 md:p-8">
      {/* Food pattern overlay */}
      <div className="absolute inset-0 bg-[url('/subtle-food-pattern.webp')] opacity-10 isolate pointer-events-none"></div>

      <div className="grid h-full w-full gap-4 grid-cols-1 lg:grid-cols-4 lg:grid-rows-5">
        {/* Sidebar - hidden on mobile, visible on large screens */}
        <SidebarFilters
          selectedCategories={selectedCategories}
          onCategoriesChange={setSelectedCategories}
          selectedDifficulties={selectedDifficulties}
          onDifficultiesChange={setSelectedDifficulties}
          selectedTime={selectedTime}
          onTimeChange={setSelectedTime}
        />

        {/* Main content area */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-4 lg:row-span-5">
          {/* Search container + Mobile filter trigger */}
          <div
            id="card-search-container"
            className="flex items-center justify-between gap-3 p-4"
          >
            <div className="flex-1">
              <Searchbar />
            </div>
            <MobileFilterDrawer
              selectedCategories={selectedCategories}
              onCategoriesChange={setSelectedCategories}
              selectedDifficulties={selectedDifficulties}
              onDifficultiesChange={setSelectedDifficulties}
              selectedTime={selectedTime}
              onTimeChange={setSelectedTime}
              activeFilterCount={activeFilterCount}
              onClearAll={handleClearAll}
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
"use client";

import FilterSection from "@/components/mainPageUI/FilterSection";
import PaginationComponent from "@/components/PaginationComponent";
import { useRecipeFilters } from "@/hooks/useRecipeFilters";
import { Recipe, Meta, DifficultyLevel, Category } from "@/types/recipes";

export default function MainPageContent({
  initialRecipes,
  initialMeta,
  initialPage,
  categories,
  difficultyLevels,
  initialCategories,
  initialDifficulties,
  initialTime,
  initialSearch,
}: {
  initialRecipes: Recipe[];
  initialMeta: Meta;
  initialPage: number;
  categories: Category[];
  difficultyLevels: DifficultyLevel[];
  initialCategories: number[];
  initialDifficulties: number[];
  initialTime: number | null;
  initialSearch: string;
}) {
  const {
    recipes,
    meta,
    currentPage,
    searchInput,
    selectedCategories,
    selectedDifficulties,
    selectedTime,
    returnUrl,
    handleCategoriesChange,
    handleDifficultiesChange,
    handleTimeChange,
    handleSearchChange,
    handlePageChange,
  } = useRecipeFilters({
    initialRecipes,
    initialMeta,
    initialPage,
    initialCategories,
    initialDifficulties,
    initialTime,
    initialSearch,
  });

  return (
    <>
      <FilterSection
        recipes={recipes}
        categories={categories}
        difficultyLevels={difficultyLevels}
        selectedCategories={selectedCategories}
        onCategoriesChange={handleCategoriesChange}
        selectedDifficulties={selectedDifficulties}
        onDifficultiesChange={handleDifficultiesChange}
        onSearchChange={handleSearchChange}
        selectedTime={selectedTime}
        onTimeChange={handleTimeChange}
        returnUrl={returnUrl}
        searchInput={searchInput}
      />
      <PaginationComponent
        recipesPagination={meta}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
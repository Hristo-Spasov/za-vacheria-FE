"use client";
import { useCallback, useState } from "react";
import { usePagination } from "@/hooks/usePagination";
import FilterSection from "@/components/mainPageUI/FilterSection";
import PaginationComponent from "@/components/PaginationComponent";
import { Recipe, Meta, DifficultyLevel, Category } from "@/types/recipes";
import { usePathname } from "next/navigation";

export default function MainPageContent({
  initialRecipes,
  initialMeta,
  initialPage,
  categories,
  difficultyLevels,
  initialCategories,
  initialDifficulties,
  initialTime,
}: {
  initialRecipes: Recipe[];
  initialMeta: Meta;
  initialPage: number;
  categories: Category[];
  difficultyLevels: DifficultyLevel[];
  initialCategories: number[];
  initialDifficulties: number[];
  initialTime: number | null;
}) {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [selectedCategories, setSelectedCategories] = useState(initialCategories);
  const [selectedDifficulties, setSelectedDifficulties] = useState(initialDifficulties);
  const [selectedTime, setSelectedTime] = useState<number | null>(initialTime);

  // Update URL with current filter state + page
  const syncUrl = useCallback(
    (page: number, cats: number[], diffs: number[], time: number | null) => {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      if (cats.length) params.set("categories", cats.join(","));
      if (diffs.length) params.set("difficulties", diffs.join(","));
      if (time !== null) params.set("maxTime", time.toString());
      window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
    },
    [pathname],
  );

  // Filter change handlers — update state + URL + reset page
  const handleCategoriesChange = useCallback(
    (newCategories: number[]) => {
      setSelectedCategories(newCategories);
      setCurrentPage(1);
      syncUrl(1, newCategories, selectedDifficulties, selectedTime);
    },
    [selectedDifficulties, selectedTime, syncUrl],
  );

  const handleDifficultiesChange = useCallback(
    (newDifficulties: number[]) => {
      setSelectedDifficulties(newDifficulties);
      setCurrentPage(1);
      syncUrl(1, selectedCategories, newDifficulties, selectedTime);
    },
    [selectedCategories, selectedTime, syncUrl],
  );

  const handleTimeChange = useCallback(
    (newTime: number | null) => {
      setSelectedTime(newTime);
      setCurrentPage(1);
      syncUrl(1, selectedCategories, selectedDifficulties, newTime);
    },
    [selectedCategories, selectedDifficulties, syncUrl],
  );

  const filters = {
    categories: selectedCategories,
    difficulties: selectedDifficulties,
    maxTime: selectedTime,
  };

  const { data } = usePagination(currentPage, 30, filters);

  const recipes = data?.data ?? initialRecipes;
  const meta = data?.meta ?? initialMeta;

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      syncUrl(page, selectedCategories, selectedDifficulties, selectedTime);
    },
    [selectedCategories, selectedDifficulties, selectedTime, syncUrl],
  );

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
        selectedTime={selectedTime}
        onTimeChange={handleTimeChange}
      />
      <PaginationComponent
        recipesPagination={meta}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
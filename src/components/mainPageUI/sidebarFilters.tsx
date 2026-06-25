"use client";

import FilterGroup from "./filters/FilterGroup";
import CategoryFilter from "./filters/CategoryFilter";
import DifficultyFilter from "./filters/DifficultyFilter";
import TimeFilter from "./filters/TimeFilter";
import { Category, DifficultyLevel } from "@/types/recipes";

interface SidebarFiltersProps {
  selectedCategories: number[];
  onCategoriesChange: (selected: number[]) => void;
  selectedDifficulties: number[];
  onDifficultiesChange: (selected: number[]) => void;
  selectedTime: number | null;
  onTimeChange: (max: number | null) => void;
  categories: Category[];
  difficultyLevels: DifficultyLevel[];
}

const SidebarFilters = ({
  selectedCategories,
  onCategoriesChange,
  selectedDifficulties,
  onDifficultiesChange,
  selectedTime,
  onTimeChange,
  categories,
  difficultyLevels,
}: SidebarFiltersProps) => {
  return (
    <aside className="hidden lg:flex lg:col-span-1 lg:row-span-5 flex-col bg-white rounded-lg shadow-md p-4 z-[1] h-fit">
      <h3 className="text-base font-bold text-foreground mb-1">Филтри</h3>
      <FilterGroup title="Категории">
        <CategoryFilter
          selected={selectedCategories}
          onChange={onCategoriesChange}
          categories={categories}
        />
      </FilterGroup>
      <FilterGroup title="Трудност">
        <DifficultyFilter
          selected={selectedDifficulties}
          onChange={onDifficultiesChange}
          difficultyLevels={difficultyLevels}
        />
      </FilterGroup>
      <FilterGroup title="Време за приготвяне" showSeparator={false}>
        <TimeFilter selected={selectedTime} onChange={onTimeChange} />
      </FilterGroup>
    </aside>
  );
};

export default SidebarFilters;
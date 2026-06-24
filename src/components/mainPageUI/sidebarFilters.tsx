"use client";

import FilterGroup from "./filters/FilterGroup";
import CategoryFilter from "./filters/CategoryFilter";
import DifficultyFilter from "./filters/DifficultyFilter";
import TimeFilter from "./filters/TimeFilter";

interface SidebarFiltersProps {
  selectedCategories: number[];
  onCategoriesChange: (selected: number[]) => void;
  selectedDifficulties: number[];
  onDifficultiesChange: (selected: number[]) => void;
  selectedTime: number | null;
  onTimeChange: (max: number | null) => void;
}

const SidebarFilters = ({
  selectedCategories,
  onCategoriesChange,
  selectedDifficulties,
  onDifficultiesChange,
  selectedTime,
  onTimeChange,
}: SidebarFiltersProps) => {
  return (
    <aside className="hidden lg:flex lg:col-span-1 lg:row-span-5 flex-col bg-white rounded-lg shadow-md p-4 z-[1]">
      <h3 className="text-base font-bold text-foreground mb-1">Филтри</h3>
      <FilterGroup title="Категории">
        <CategoryFilter
          selected={selectedCategories}
          onChange={onCategoriesChange}
        />
      </FilterGroup>
      <FilterGroup title="Трудност">
        <DifficultyFilter
          selected={selectedDifficulties}
          onChange={onDifficultiesChange}
        />
      </FilterGroup>
      <FilterGroup title="Време за приготвяне" showSeparator={false}>
        <TimeFilter selected={selectedTime} onChange={onTimeChange} />
      </FilterGroup>
    </aside>
  );
};

export default SidebarFilters;
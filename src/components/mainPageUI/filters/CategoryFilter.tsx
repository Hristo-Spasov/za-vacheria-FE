"use client";

import { Checkbox } from "@/components/ui/checkbox";

// Placeholder categories — will be fetched from DB later
const PLACEHOLDER_CATEGORIES = [
  { id: 1, name: "Салати", slug: "salads" },
  { id: 2, name: "Супи", slug: "soups" },
  { id: 3, name: "Основни", slug: "main-dishes" },
  { id: 4, name: "Десерти", slug: "desserts" },
  { id: 5, name: "Предястия", slug: "appetizers" },
  { id: 6, name: "Напитки", slug: "drinks" },
];

interface CategoryFilterProps {
  selected: number[];
  onChange: (selected: number[]) => void;
}

const CategoryFilter = ({ selected, onChange }: CategoryFilterProps) => {
  const handleToggle = (categoryId: number) => {
    if (selected.includes(categoryId)) {
      onChange(selected.filter((id) => id !== categoryId));
    } else {
      onChange([...selected, categoryId]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {PLACEHOLDER_CATEGORIES.map((category) => (
        <label
          key={category.id}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <Checkbox
            id={`category-${category.id}`}
            checked={selected.includes(category.id)}
            onCheckedChange={() => handleToggle(category.id)}
            className="bg-white border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
          />
          <span className="text-sm text-gray-800 group-hover:text-foreground transition-colors">
            {category.name}
          </span>
        </label>
      ))}
    </div>
  );
};

export default CategoryFilter;
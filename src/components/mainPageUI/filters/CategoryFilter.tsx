"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Category } from "@/types/recipes";

interface CategoryFilterProps {
  selected: number[];
  onChange: (selected: number[]) => void;
  categories: Category[];
}

const CategoryFilter = ({ selected, onChange, categories }: CategoryFilterProps) => {
  const handleToggle = (categoryId: number) => {
    if (selected.includes(categoryId)) {
      onChange(selected.filter((id) => id !== categoryId));
    } else {
      onChange([...selected, categoryId]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {categories.map((category) => (
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
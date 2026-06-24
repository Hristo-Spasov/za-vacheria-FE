"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DifficultyLevel } from "@/types/recipes";

interface DifficultyFilterProps {
  selected: number[];
  onChange: (selected: number[]) => void;
  difficultyLevels: DifficultyLevel[];
}

const DifficultyFilter = ({ selected, onChange, difficultyLevels }: DifficultyFilterProps) => {
  const handleToggle = (difficultyId: number) => {
    if (selected.includes(difficultyId)) {
      onChange(selected.filter((id) => id !== difficultyId));
    } else {
      onChange([...selected, difficultyId]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {difficultyLevels.map((difficulty) => (
        <label
          key={difficulty.id}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <Checkbox
            id={`difficulty-${difficulty.id}`}
            checked={selected.includes(difficulty.id)}
            onCheckedChange={() => handleToggle(difficulty.id)}
            className="bg-white border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
          />
          <span className="text-sm text-gray-800 group-hover:text-foreground transition-colors">
            {difficulty.name}
          </span>
        </label>
      ))}
    </div>
  );
};

export default DifficultyFilter;
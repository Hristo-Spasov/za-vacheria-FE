"use client";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface ActiveFilter {
  type: "category" | "difficulty" | "time";
  label: string;
  value: number | string;
}

interface ActiveFiltersProps {
  filters: ActiveFilter[];
  onRemove: (filter: ActiveFilter) => void;
  onClearAll: () => void;
}

const ActiveFilters = ({ filters, onRemove, onClearAll }: ActiveFiltersProps) => {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((filter, index) => (
        <Badge
          key={`${filter.type}-${filter.value}-${index}`}
          className="gap-1 pr-1 pl-2.5 py-1 text-xs bg-orange-500 text-white border-orange-500 hover:bg-orange-600 z-10"
        >
          {filter.label}
            <button
            onClick={() => onRemove(filter)}
            className="ml-1 rounded-full p-0.5 hover:bg-white/20 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      {filters.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
        >
          Изчисти всички
        </Button>
      )}
    </div>
  );
};

export default ActiveFilters;
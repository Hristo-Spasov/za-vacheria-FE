"use client";

import { Button } from "@/components/ui/button";

// Fixed time range options — pills/segmented buttons
const TIME_RANGES = [
  { label: "до 15 мин", max: 15 },
  { label: "до 30 мин", max: 30 },
  { label: "до 60 мин", max: 60 },
  { label: "60+ мин", max: Infinity },
];

interface TimeFilterProps {
  selected: number | null;
  onChange: (max: number | null) => void;
}

const TimeFilter = ({ selected, onChange }: TimeFilterProps) => {
  const handleSelect = (max: number) => {
    // Toggle off if already selected
    if (selected === max) {
      onChange(null);
    } else {
      onChange(max);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {TIME_RANGES.map((range) => (
        <Button
          key={range.max}
          variant={selected === range.max ? "default" : "outline"}
          size="sm"
          className={`rounded-full text-xs transition-all ${
            selected === range.max
              ? "bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
              : ""
          }`}
          onClick={() => handleSelect(range.max)}
        >
          {range.label}
        </Button>
      ))}
    </div>
  );
};

export default TimeFilter;
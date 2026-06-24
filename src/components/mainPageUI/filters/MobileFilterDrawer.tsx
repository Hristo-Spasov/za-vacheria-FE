"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import FilterGroup from "./FilterGroup";
import CategoryFilter from "./CategoryFilter";
import DifficultyFilter from "./DifficultyFilter";
import TimeFilter from "./TimeFilter";

interface MobileFilterDrawerProps {
  selectedCategories: number[];
  onCategoriesChange: (selected: number[]) => void;
  selectedDifficulties: number[];
  onDifficultiesChange: (selected: number[]) => void;
  selectedTime: number | null;
  onTimeChange: (max: number | null) => void;
  activeFilterCount: number;
  onClearAll: () => void;
}

const MobileFilterDrawer = ({
  selectedCategories,
  onCategoriesChange,
  selectedDifficulties,
  onDifficultiesChange,
  selectedTime,
  onTimeChange,
  activeFilterCount,
  onClearAll,
}: MobileFilterDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden gap-2 z-[1]">
          <SlidersHorizontal className="h-4 w-4" />
          Филтри
          {activeFilterCount > 0 && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] text-white font-medium">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Филтри</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-2 overflow-y-auto max-h-[60vh] space-y-0">
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
        </div>
        <DrawerFooter className="flex-row gap-2">
          {activeFilterCount > 0 && (
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="flex-1"
                onClick={onClearAll}
              >
                Изчисти
              </Button>
            </DrawerClose>
          )}
          <DrawerClose asChild>
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
              Покажи резултати
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFilterDrawer;
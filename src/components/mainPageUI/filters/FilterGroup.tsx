"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

interface FilterGroupProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  showSeparator?: boolean;
}

const FilterGroup = ({
  title,
  defaultOpen = true,
  children,
  showSeparator = true,
}: FilterGroupProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between py-3 px-1 group cursor-pointer">
        <span className="text-sm font-semibold text-foreground uppercase tracking-wide">
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pb-3 px-1">
        {children}
      </CollapsibleContent>
      {showSeparator && <Separator />}
    </Collapsible>
  );
};

export default FilterGroup;
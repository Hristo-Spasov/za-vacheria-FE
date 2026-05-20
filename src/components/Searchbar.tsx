"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState } from "react";

const Searchbar = () => {
  const [value, setValue] = useState("");

  return (
    <div id="searchBar" className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input
        placeholder="Потърси рецепти..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-12 w-full bg-white rounded-full border border-gray-200 pl-12 pr-10 shadow-sm focus-visible:border-orange-600 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      {value && (
        <button
          onClick={() => setValue("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default Searchbar;

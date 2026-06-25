"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import { usePagination } from "@/hooks/usePagination";
import { Recipe, Meta } from "@/types/recipes";

type UseRecipeFiltersOptions = {
  initialRecipes: Recipe[];
  initialMeta: Meta;
  initialPage: number;
  initialCategories: number[];
  initialDifficulties: number[];
  initialTime: number | null;
  initialSearch: string;
};

export function useRecipeFilters({
  initialRecipes,
  initialMeta,
  initialPage,
  initialCategories,
  initialDifficulties,
  initialTime,
  initialSearch,
}: UseRecipeFiltersOptions) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const returnUrl = `/main?${searchParams.toString()}`;

  // --- State ---
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [selectedCategories, setSelectedCategories] = useState(initialCategories);
  const [selectedDifficulties, setSelectedDifficulties] = useState(initialDifficulties);
  const [selectedTime, setSelectedTime] = useState<number | null>(initialTime);
  const [searchInput, setSearchInput] = useState(initialSearch ?? "");

  const debouncedSearch = useDebounce(searchInput, 300);

  // --- URL sync ---
  const syncUrl = useCallback(
    (search: string, page: number, cats: number[], diffs: number[], time: number | null) => {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      if (search.length) params.set("search", search);
      if (cats.length) params.set("categories", cats.join(","));
      if (diffs.length) params.set("difficulties", diffs.join(","));
      if (time !== null) params.set("maxTime", time.toString());
      window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
    },
    [pathname],
  );

  // --- Filter change handlers ---
  const handleCategoriesChange = useCallback(
    (newCategories: number[]) => {
      setSelectedCategories(newCategories);
      setCurrentPage(1);
      syncUrl(debouncedSearch, 1, newCategories, selectedDifficulties, selectedTime);
    },
    [selectedDifficulties, selectedTime, syncUrl, debouncedSearch],
  );

  const handleDifficultiesChange = useCallback(
    (newDifficulties: number[]) => {
      setSelectedDifficulties(newDifficulties);
      setCurrentPage(1);
      syncUrl(debouncedSearch, 1, selectedCategories, newDifficulties, selectedTime);
    },
    [debouncedSearch, selectedCategories, selectedTime, syncUrl],
  );

  const handleTimeChange = useCallback(
    (newTime: number | null) => {
      setSelectedTime(newTime);
      setCurrentPage(1);
      syncUrl(debouncedSearch, 1, selectedCategories, selectedDifficulties, newTime);
    },
    [debouncedSearch, selectedCategories, selectedDifficulties, syncUrl],
  );

  // --- Search ---
  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value.trimStart());
  }, []);

  // Sync URL when debounced search value changes
  useEffect(() => {
    setCurrentPage(1);
    syncUrl(debouncedSearch, 1, selectedCategories, selectedDifficulties, selectedTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // --- Pagination ---
  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      syncUrl(debouncedSearch, page, selectedCategories, selectedDifficulties, selectedTime);
    },
    [debouncedSearch, selectedCategories, selectedDifficulties, selectedTime, syncUrl],
  );

  // --- Data fetching ---
  const filters = {
    categories: selectedCategories,
    difficulties: selectedDifficulties,
    maxTime: selectedTime,
  };

  const trimmedSearch = debouncedSearch.trim();
  const { data } = usePagination(currentPage, 30, trimmedSearch || undefined, filters);

  const recipes = data?.data ?? initialRecipes;
  const meta = data?.meta ?? initialMeta;

  return {
    recipes,
    meta,
    currentPage,
    searchInput,
    selectedCategories,
    selectedDifficulties,
    selectedTime,
    returnUrl,
    handleCategoriesChange,
    handleDifficultiesChange,
    handleTimeChange,
    handleSearchChange,
    handlePageChange,
  };
}
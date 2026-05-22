"use client";
import { useCallback, useState } from "react";
import { usePagination } from "@/hooks/usePagination";
import FilterSection from "@/components/mainPageUI/FilterSection";
import PaginationComponent from "@/components/PaginationComponent";
import { Recipe, Meta } from "@/types/recipes";
import { useSearchParams, usePathname } from "next/navigation";

export default function MainPageContent({
  initialRecipes,
  initialMeta,
  initialPage,
}: {
  initialRecipes: Recipe[];
  initialMeta: Meta;
  initialPage: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { data } = usePagination(currentPage);

  const recipes = data?.data ?? initialRecipes;
  const meta = data?.meta ?? initialMeta;

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
      setCurrentPage(page);
    },
    [searchParams, pathname],
  );

  return (
    <>
      <FilterSection recipes={recipes} />
      <PaginationComponent
        recipesPagination={meta}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

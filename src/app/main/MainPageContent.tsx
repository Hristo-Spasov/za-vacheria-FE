"use client";
import { useState } from "react";
import { usePagination } from "@/hooks/usePagination";
import FilterSection from "@/components/mainPageUI/FilterSection";
import PaginationComponent from "@/components/PaginationComponent";
import { Recipe, Meta } from "@/types/recipes";

export default function MainPageContent({
  initialRecipes,
  initialMeta,
}: {
  initialRecipes: Recipe[];
  initialMeta: Meta;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = usePagination(currentPage);

  const recipes = data?.data ?? initialRecipes;
  const meta = data?.meta ?? initialMeta;

  return (
    <>
      <FilterSection recipes={recipes} />
      <PaginationComponent
        recipesPagination={meta}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

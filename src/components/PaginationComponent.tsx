"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Meta } from "@/types/recipes";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type PaginationComponentProps = {
  recipesPagination: Meta;
  onPageChange: (page: number) => void;
  currentPage: number;
};
const PaginationComponent = (props: PaginationComponentProps) => {
  const { recipesPagination, onPageChange, currentPage } = props;
  const totalPages = recipesPagination.pagination.pageCount;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  };
  const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }
    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = useMemo(
    () => generatePagination(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const previousPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const nextPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const goToPage = (page: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1 || currentPage < 1 || currentPage > totalPages) return null;

  return (
    <Pagination className="my-6">
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          {currentPage > 1 ? (
            <PaginationPrevious
              href={createPageUrl(currentPage - 1)}
              onClick={previousPage}
              className="rounded-lg transition-colors duration-200 hover:bg-orange-100 hover:text-orange-700"
              aria-label="Назад"
            />
          ) : (
            <span aria-disabled="true" aria-label="Назад" className="inline-flex items-center rounded-lg px-4 py-2 text-sm opacity-50">
              ← Назад
            </span>
          )}
        </PaginationItem>

        {/* Dynamic page numbers */}
        {pageNumbers.map((page, index) => (
          <PaginationItem key={page === "ellipsis" ? `e-${index}` : page} className="z-10">
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={createPageUrl(page)}
                isActive={page === currentPage}
                onClick={goToPage(page)}
                className={`rounded-lg transition-none ${
                  page === currentPage
                    ? "bg-orange-500 text-white hover:bg-orange-600 shadow-md border-orange-500"
                    : "hover:bg-orange-100 hover:text-orange-700"
                }`}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next */}
        <PaginationItem>
          {currentPage < totalPages ? (
            <PaginationNext
              href={createPageUrl(currentPage + 1)}
              onClick={nextPage}
              className="rounded-lg transition-colors duration-200 hover:bg-orange-100 hover:text-orange-700"
              aria-label="Напред"
            />
          ) : (
            <span aria-disabled="true" aria-label="Напред" className="inline-flex items-center rounded-lg px-4 py-2 text-sm opacity-50">
              Напред →
            </span>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;

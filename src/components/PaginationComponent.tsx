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

type PaginationComponentProps = {
  recipesPagination: Meta;
  onPageChange: (page: number) => void;
  currentPage: number;
};
const PaginationComponent = (props: PaginationComponentProps) => {
  const { recipesPagination, onPageChange, currentPage } = props;
  const totalPages = recipesPagination.pagination.pageCount;

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

  const goToPage = (page: number, e?: React.MouseEvent<HTMLAnchorElement>) => {
    if (e) e.preventDefault();
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <Pagination className="my-6">
      <PaginationContent>
        {/* Prev Button */}
        <PaginationItem>
          <PaginationPrevious href="#" onClick={previousPage} />
        </PaginationItem>

        {/* First Page */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={previousPage}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink href="#" isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {/* Next page number — only if there IS a next page */}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink href="#" onClick={(e) => goToPage(currentPage + 1, e)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage + 1 < totalPages && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={(e) => goToPage(totalPages, e)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext href="#" onClick={nextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;

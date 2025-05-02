import React from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "../ui/button";

export const PaginationControls = ({ page, pages, isFetching, onPageChange }) =>
  pages > 1 && (
    <div className="sticky bottom-4 left-0 right-0 flex justify-center z-10 px-2 sm:px-0">
      <div className="bg-card p-2 rounded-md shadow-lg max-w-full overflow-x-auto">
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onPageChange(Math.max(page - 1, 1))}
            disabled={page === 1 || isFetching}
            className="min-w-8 h-8"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Desktop pages */}
            {Array.from({ length: Math.min(5, pages) }, (_, i) => {
              let pageNum;
              if (pages <= 5) pageNum = i + 1;
              else if (page <= 3) pageNum = i + 1;
              else if (page >= pages - 2) pageNum = pages - 4 + i;
              else pageNum = page - 2 + i;

              return (
                <Button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  disabled={isFetching}
                  variant={page === pageNum ? "secondary" : "ghost"}
                  className={`min-w-8 h-8 hidden sm:flex ${isFetching ? "opacity-70" : ""}`}
                >
                  {pageNum}
                </Button>
              );
            })}

            {/* Mobile pages */}
            {Array.from({ length: Math.min(3, pages) }, (_, i) => {
              let pageNum;
              if (pages <= 3) pageNum = i + 1;
              else if (page <= 2) pageNum = i + 1;
              else if (page >= pages - 1) pageNum = pages - 2 + i;
              else pageNum = page - 1 + i;

              return (
                <Button
                  key={`mobile-${pageNum}`}
                  onClick={() => onPageChange(pageNum)}
                  disabled={isFetching}
                  variant={page === pageNum ? "secondary" : "ghost"}
                  className={`min-w-8 h-8 flex sm:hidden ${isFetching ? "opacity-70" : ""}`}
                >
                  {pageNum}
                </Button>
              );
            })}

            {/* Ellipsis desktop */}
            {pages > 5 &&
              page < pages - 2 &&
              ![pages - 2, pages - 1, pages].includes(page) && (
                <>
                  <span className="px-1 sm:px-2 hidden sm:inline">...</span>
                  <Button
                    variant="ghost"
                    onClick={() => onPageChange(pages)}
                    disabled={isFetching}
                    className={`min-w-8 h-8 hidden sm:flex ${isFetching ? "opacity-70" : ""}`}
                  >
                    {pages}
                  </Button>
                </>
              )}

            {/* Ellipsis mobile */}
            {pages > 3 &&
              page < pages - 1 &&
              ![pages - 1, pages].includes(page) && (
                <>
                  <span className="px-1 flex sm:hidden">...</span>
                  <Button
                    variant="ghost"
                    onClick={() => onPageChange(pages)}
                    disabled={isFetching}
                    className={`min-w-8 h-8 flex sm:hidden ${isFetching ? "opacity-70" : ""}`}
                  >
                    {pages}
                  </Button>
                </>
              )}
          </div>

          <Button
            variant="secondary"
            size="icon"
            onClick={() => onPageChange(Math.min(page + 1, pages))}
            disabled={page === pages || isFetching}
            className="min-w-8 h-8"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

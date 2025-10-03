"use client";

import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// interface DataItem {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
// }

interface DynamicPaginationProps {
  show: string;
  pages: number;
}

const DynamicPagination = ({ show, pages }: DynamicPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Sample data - in a real app, this would come from an API
  // const allItems: DataItem[] = Array.from({ length: 97 }, (_, i) => ({
  //   id: i + 1,
  //   name: `Product ${i + 1}`,
  //   category: `Category ${Math.floor(i / 20) + 1}`,
  //   price: Math.floor(Math.random() * 1000) + 100,
  // }));

  // Calculate pagination values
  // const totalItems = allItems.length;
  const totalPages = pages;
  const startIndex = (currentPage - 1) * Number(show);
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = allItems.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers to display
  const getVisiblePages = () => {
    const visiblePages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // If total pages is less than max visible, show all
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      // Always include first page
      visiblePages.push(1);

      // Calculate start and end of visible pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're at the beginning
      if (currentPage <= 3) {
        end = 4;
      }

      // Adjust if we're at the end
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (start > 2) {
        visiblePages.push("ellipsis-left");
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        visiblePages.push(i);
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        visiblePages.push("ellipsis-right");
      }

      // Always include last page
      visiblePages.push(totalPages);
    }

    return visiblePages;
  };

  return (
    <div className="container mx-auto py-6">
      {/* Pagination component */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {getVisiblePages().map((page, index) => {
            if (page === "ellipsis-left" || page === "ellipsis-right") {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            const pageNumber = page as number;
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(pageNumber);
                  }}
                  isActive={currentPage === pageNumber}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default DynamicPagination;

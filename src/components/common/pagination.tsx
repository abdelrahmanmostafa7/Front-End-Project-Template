"use client";

import React from "react";
import { useTranslations } from "next-intl";

import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
};

export default function Pagination({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
  isLoading = false,
}: Props) {
  const t = useTranslations("common");
  const totalPages = Math.ceil(totalCount / pageSize);
  const maxVisiblePages = 5;

  if (totalPages <= 1 && !isLoading) {
    return null;
  }

  const generatePaginationItems = () => {
    const items: React.ReactNode[] = [];

    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(
      totalPages - 1,
      currentPage + Math.floor(maxVisiblePages / 2),
    );

    if (totalPages <= maxVisiblePages + 2) {
      startPage = 2;
      endPage = totalPages - 1;
    }

    items.push(
      <PaginationItem key={1}>
        <PaginationLink
          onClick={() => !isLoading && onPageChange(1)}
          className={`w-7 h-7 flex items-center justify-center rounded text-xs cursor-pointer transition ${
            currentPage === 1
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-200 text-gray-700"
          } ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
        >
          1
        </PaginationLink>
      </PaginationItem>,
    );

    if (startPage > 2) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <span className="w-7 h-7 flex items-center justify-center text-gray-500 text-xs">
            ...
          </span>
        </PaginationItem>,
      );
    }

    const middleItems = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    ).map((i) => (
      <PaginationItem key={i}>
        <PaginationLink
          onClick={() => !isLoading && onPageChange(i)}
          className={`w-7 h-7 flex items-center justify-center rounded text-xs cursor-pointer transition ${
            currentPage === i
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-200 text-gray-700"
          } ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    ));

    items.push(...middleItems);

    if (endPage < totalPages - 1) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <span className="w-7 h-7 flex items-center justify-center text-gray-500 text-xs">
            ...
          </span>
        </PaginationItem>,
      );
    }

    if (totalPages > 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => !isLoading && onPageChange(totalPages)}
            className={`w-7 h-7 flex items-center justify-center rounded text-xs cursor-pointer transition ${
              currentPage === totalPages
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200 text-gray-700"
            } ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  const generatePlaceholderItems = () => (
    <>
      {[1, 2, 3, 4, 5].map((key) => (
        <PaginationItem key={key}>
          <div className="w-7 h-7 flex items-center justify-center rounded text-xs select-none border bg-gray-100 text-gray-400 border-gray-200 animate-pulse">
            {key}
          </div>
        </PaginationItem>
      ))}
      <PaginationItem>
        <span className="w-7 h-7 flex items-center justify-center text-gray-500 text-xs">
          ...
        </span>
      </PaginationItem>
    </>
  );

  return (
    <div className="flex justify-center p-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() =>
              !isLoading && currentPage > 1 && onPageChange(currentPage - 1)
            }
            className={`w-7 h-7 flex items-center justify-center rounded text-xs cursor-pointer transition ${
              currentPage === 1 || isLoading
                ? "pointer-events-none opacity-50"
                : "hover:bg-gray-200"
            }`}
          >
            {t("pagination.previous")}
          </PaginationPrevious>
        </PaginationItem>

        {isLoading ? generatePlaceholderItems() : generatePaginationItems()}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              !isLoading &&
              currentPage < totalPages &&
              onPageChange(currentPage + 1)
            }
            className={`w-7 h-7 flex items-center justify-center rounded text-xs cursor-pointer transition ${
              currentPage === totalPages || isLoading
                ? "pointer-events-none opacity-50"
                : "hover:bg-gray-200"
            }`}
          >
            {t("pagination.next")}
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </div>
  );
}

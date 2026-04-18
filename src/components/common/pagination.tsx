'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

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
  const t = useTranslations('common');
  const totalPages = Math.ceil(totalCount / pageSize);
  const maxVisiblePages = 5;

  if (totalPages <= 1 && !isLoading) {
    return null;
  }

  const generatePaginationItems = () => {
    const items: React.ReactNode[] = [];

    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxVisiblePages / 2));

    if (totalPages <= maxVisiblePages + 2) {
      startPage = 2;
      endPage = totalPages - 1;
    }

    items.push(
      <PaginationItem key={1}>
        <PaginationLink
          onClick={() => !isLoading && onPageChange(1)}
          className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded text-xs transition ${
            currentPage === 1 ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
          } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
        >
          1
        </PaginationLink>
      </PaginationItem>,
    );

    if (startPage > 2) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <span className="flex h-7 w-7 items-center justify-center text-xs text-gray-500">
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
          className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded text-xs transition ${
            currentPage === i ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
          } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    ));

    items.push(...middleItems);

    if (endPage < totalPages - 1) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <span className="flex h-7 w-7 items-center justify-center text-xs text-gray-500">
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
            className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded text-xs transition ${
              currentPage === totalPages
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
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
          <div className="flex h-7 w-7 animate-pulse items-center justify-center rounded border border-gray-200 bg-gray-100 text-xs text-gray-400 select-none">
            {key}
          </div>
        </PaginationItem>
      ))}
      <PaginationItem>
        <span className="flex h-7 w-7 items-center justify-center text-xs text-gray-500">...</span>
      </PaginationItem>
    </>
  );

  return (
    <div className="flex justify-center p-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => !isLoading && currentPage > 1 && onPageChange(currentPage - 1)}
            className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded text-xs transition ${
              currentPage === 1 || isLoading
                ? 'pointer-events-none opacity-50'
                : 'hover:bg-gray-200'
            }`}
          >
            {t('pagination.previous')}
          </PaginationPrevious>
        </PaginationItem>

        {isLoading ? generatePlaceholderItems() : generatePaginationItems()}

        <PaginationItem>
          <PaginationNext
            onClick={() => !isLoading && currentPage < totalPages && onPageChange(currentPage + 1)}
            className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded text-xs transition ${
              currentPage === totalPages || isLoading
                ? 'pointer-events-none opacity-50'
                : 'hover:bg-gray-200'
            }`}
          >
            {t('pagination.next')}
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </div>
  );
}

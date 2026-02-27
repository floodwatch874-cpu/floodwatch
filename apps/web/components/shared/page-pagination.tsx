'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useSearchParams } from 'next/navigation';

type PagePaginationProps = {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
};

export default function PagePagination({
  currentPage: currentPageProp,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
}: PagePaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(currentPageProp);

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageUrl(currentPage - 1)}
            aria-disabled={!hasPrevPage}
            className={!hasPrevPage ? 'pointer-events-none opacity-50' : ''}
            onClick={(e) => {
              e.preventDefault();
              if (hasPrevPage) onPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>

        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const pageNum = page as number;
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href={createPageUrl(pageNum)}
                isActive={pageNum === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(pageNum);
                }}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={createPageUrl(currentPage + 1)}
            aria-disabled={!hasNextPage}
            className={!hasNextPage ? 'pointer-events-none opacity-50' : ''}
            onClick={(e) => {
              e.preventDefault();
              if (hasNextPage) onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

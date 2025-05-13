import { PaginationItem, PaginationLink } from '@/components/ui/Pagination';
import { cn } from '@/lib/utils';
import { Table } from '@tanstack/react-table';
import { ReactNode, useMemo } from 'react';

interface UsePaginationProps<TData> {
  currentPage: number;
  pageCount: number;
  setPage: (page: number) => void;
  table: Table<TData>;
  maxPagesToShow?: number;
}

export const usePagination = <TData,>({
  currentPage,
  pageCount,
  setPage,
  maxPagesToShow = 7,
}: UsePaginationProps<TData>) => {
  const paginationItems = useMemo(() => {
    const items: ReactNode[] = [];

    if (pageCount <= 0 || currentPage < 1 || currentPage > pageCount) {
      return items;
    }

    const addPageButton = (pageNum: number) => {
      const isCurrent = pageNum === currentPage;
      items.push(
        <PaginationItem key={`page-${pageNum}`}>
          <PaginationLink
            onClick={() => setPage(pageNum)}
            className={cn(
              'w-9 h-9 flex items-center justify-center rounded-md',
              isCurrent
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-200',
            )}
          >
            {pageNum}
          </PaginationLink>
        </PaginationItem>,
      );
    };

    const addEllipsis = (key: string) => {
      items.push(
        <PaginationItem key={`ellipsis-${key}`}>
          <span className="w-9 h-9 flex items-center justify-center">…</span>
        </PaginationItem>,
      );
    };

    if (pageCount <= maxPagesToShow) {
      for (let i = 1; i <= pageCount; i++) {
        addPageButton(i);
      }
    } else {
      addPageButton(1);

      if (currentPage <= 4) {
        for (let i = 2; i <= 5; i++) {
          addPageButton(i);
        }
        addEllipsis('right');
        addPageButton(pageCount);
      } else if (currentPage >= pageCount - 3) {
        addEllipsis('left');
        for (let i = pageCount - 4; i <= pageCount; i++) {
          addPageButton(i);
        }
      } else {
        addEllipsis('left');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          addPageButton(i);
        }
        addEllipsis('right');
        addPageButton(pageCount);
      }
    }

    return items;
  }, [currentPage, pageCount, maxPagesToShow, setPage]);

  return {
    paginationItems,
  };
};

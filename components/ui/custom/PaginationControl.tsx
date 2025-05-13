import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/Pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { cn } from '@/lib/utils';
import { usePagination } from '@/shared/hooks/usePagination';
import { Table } from '@tanstack/react-table';

interface PaginationControlsProps<TData> {
  currentPage: number;
  pageCount: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  table: Table<TData>;
  maxPagesToShow?: number;
  className?: string;
  pageSizes?: number[];
}

export const PaginationControls = <TData,>({
  currentPage,
  pageCount,
  setPage,
  setLimit,
  table,
  maxPagesToShow = 7,
  className,
  pageSizes = [10, 20, 50, 100],
}: PaginationControlsProps<TData>) => {
  const { paginationItems } = usePagination({
    currentPage,
    pageCount,
    setPage,
    maxPagesToShow,
    table,
  });

  if (pageCount <= 0) {
    return null;
  }

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage(currentPage - 1)}
              className={cn(
                'cursor-pointer',
                !table.getCanPreviousPage() && 'pointer-events-none opacity-50',
              )}
            />
          </PaginationItem>

          {paginationItems}

          <PaginationItem>
            <PaginationNext
              onClick={() => setPage(currentPage + 1)}
              className={cn(
                'cursor-pointer',
                !table.getCanNextPage() && 'pointer-events-none opacity-50',
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Select
        value={table.getState().pagination.pageSize.toString()}
        onValueChange={(value) => {
          const newSize = Number(value);
          table.setPageSize(newSize);
          setLimit(newSize);
          setPage(1);
        }}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Chọn số lượng" />
        </SelectTrigger>
        <SelectContent>
          {pageSizes.map((size) => (
            <SelectItem key={size} value={size.toString()}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

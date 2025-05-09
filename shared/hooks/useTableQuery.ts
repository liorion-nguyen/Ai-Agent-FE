import { APIErrorHandler } from '@/services/types';
import { TableQueryParams, UseTableQueryOptions } from '@/shared/types/table';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useTableQuery = <TData>(
  columns: ColumnDef<TData, string>[],
  useApiHook: (queryParams: TableQueryParams) => {
    data:
      | { data: TData[]; totalCount: number; totalPages?: number }
      | undefined;
    isLoading: boolean;
    error: APIErrorHandler | null;
  },
  options: UseTableQueryOptions = {},
) => {
  const {
    enablePagination = true,
    enableSorting = true,
    enableSearch = true,
    defaultPageSize = 10,
  } = options;

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(defaultPageSize);
  const [sort, setSort] = useState<SortingState>([]);
  const [search, setSearch] = useState<string>('');

  const updatePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const updateLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  }, []);

  const updateSort = useCallback(
    (updaterOrValue: SortingState | ((old: SortingState) => SortingState)) => {
      setSort(updaterOrValue);
      setPage(1);
    },
    [],
  );

  const updateSearch = useCallback((newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  }, []);

  const sortOrder: 'ASC' | 'DESC' | undefined = enableSorting
    ? sort?.[0]?.desc
      ? 'DESC'
      : 'ASC'
    : undefined;

  const queryParams: TableQueryParams = useMemo(
    () => ({
      ...(enablePagination && { page }),
      ...(enablePagination && { limit }),
      ...(enableSorting &&
        sort.length > 0 && {
          sortBy: sort[0]?.id,
          sortOrder,
        }),
      ...(enableSearch && search && search.trim() !== '' && { search }),
    }),
    [
      page,
      limit,
      sort,
      search,
      enablePagination,
      enableSorting,
      enableSearch,
      sortOrder,
    ],
  );

  const { data, isLoading, error } = useApiHook(queryParams);

  const pageCount =
    data?.totalPages || Math.ceil((data?.totalCount || 0) / limit);

  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(enableSorting && { getSortedRowModel: getSortedRowModel() }),
    ...(enablePagination && { getPaginationRowModel: getPaginationRowModel() }),
    manualPagination: true,
    manualSorting: true,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: limit,
      },
      sorting: sort,
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newState = updater({ pageIndex: page - 1, pageSize: limit });
        updatePage(newState.pageIndex + 1);
        updateLimit(newState.pageSize);
      }
    },
    onSortingChange: updateSort,
    pageCount,
  });

  useEffect(() => {
    if (table.getState().pagination.pageIndex !== page - 1) {
      table.setPageIndex(page - 1);
    }
    if (table.getState().pagination.pageSize !== limit) {
      table.setPageSize(limit);
    }
  }, [page, limit, table]);

  useEffect(() => {
    if (page > pageCount && pageCount > 0) {
      setPage(pageCount);
      table.setPageIndex(pageCount - 1);
    }
  }, [page, pageCount, table]);

  return {
    table,
    isLoading,
    error,
    page,
    limit,
    sort,
    search,
    setPage: updatePage,
    setLimit: updateLimit,
    setSort: updateSort,
    setSearch: updateSearch,
    pageCount,
    currentPage: page,
    hasData: table.getRowModel().rows.length > 0,
  };
};

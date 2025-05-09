export interface TableQueryParams {
  search?: string;
  sortOrder?: 'ASC' | 'DESC';
  sortBy?: string;
  limit?: number;
  page?: number;
  [key: string]: unknown;
}

export interface UseTableQueryOptions {
  enablePagination?: boolean;
  enableSorting?: boolean;
  enableSearch?: boolean;
  defaultPageSize?: number;
}

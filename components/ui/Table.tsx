import { cn } from '@/lib/utils';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

type GenericTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  className?: string;
  tableClassName?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
};

const GenericTable = <T extends object>({
  data,
  columns,
  className,
  tableClassName,
  headerClassName,
  rowClassName,
  cellClassName,
}: GenericTableProps<T>) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const memoizedData = React.useMemo(() => data, [data]);
  const memoizedColumns = React.useMemo(() => columns, [columns]);

  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: process.env.NODE_ENV === 'development', // Fixed to use NODE_ENV
  });

  return (
    <div className={cn('overflow-x-auto w-full', className)}>
      <table
        role="grid"
        aria-label="Danh sách biểu mẫu"
        className={cn(
          'w-full border border-gray-200 table-auto',
          tableClassName,
        )}
      >
        <thead className={cn('bg-gray-50', headerClassName)}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={cn(
                    'py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                    header.column.getCanSort() && 'cursor-pointer select-none',
                  )}
                  onClick={header.column.getToggleSortingHandler()}
                  aria-sort={
                    header.column.getIsSorted()
                      ? header.column.getIsSorted() === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                  }
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: <span>🔼</span>,
                        desc: <span>🔽</span>,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={cn(
                'border-b border-gray-200 hover:bg-gray-50',
                rowClassName,
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={cn(
                    'py-3 px-4 text-sm text-gray-900',
                    cellClassName,
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { ReactNode } from 'react';

interface ColumnConfig<T> {
  key: keyof T | 'actions';
  header: string;
  cell?: (row: T) => ReactNode;
}

export function useGenerateColumns<T>(config: {
  columns: ColumnConfig<T>[];
}): ColumnDef<T, unknown>[] {
  const columnHelper = createColumnHelper<T>();

  return config.columns.map(({ key, header, cell }) => {
    if (key === 'actions') {
      return {
        id: 'actions',
        header,
        cell: ({ row }) => cell?.(row.original),
      } as ColumnDef<T, unknown>;
    }

    return columnHelper.accessor((row: T) => row[key] as unknown, {
      header,
      cell: (info) => {
        if (cell) return cell(info.row.original);
        return info.getValue();
      },
    });
  });
}

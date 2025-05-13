import { useGetPayments } from '@/app/[lang]/(user)/(root)/dashboard/payment-management/hooks/usePayment';
import { usePaymentColumns } from '@/components/ui/columns/PaymentColumns';
import { PaginationControls } from '@/components/ui/custom/PaginationControl';
import Search from '@/components/ui/Search';
import { Spinner } from '@/components/ui/Spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { cn } from '@/lib/utils';
import { useTableQuery } from '@/shared/hooks/useTableQuery';
import { PaymentList } from '@/shared/types';
import { flexRender } from '@tanstack/react-table';

const PaymentTable = () => {
  const {
    table,
    isLoading,
    error,
    search,
    setSearch,
    setLimit,
    setPage,
    pageCount,
    currentPage,
    hasData,
  } = useTableQuery<PaymentList>(usePaymentColumns(), useGetPayments, {
    enablePagination: true,
    enableSorting: true,
    enableSearch: true,
    defaultPageSize: 10,
  });

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading permissions: {error.message?.message ?? 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="space-y-6 md:pr-8 md:pl-8 w-full">
      <div className="flex justify-between items-center mb-4">
        <Search
          value={search}
          onChange={setSearch}
          placeholder="Search payments..."
          className="w-64"
        />
      </div>

      <div className="relative rounded-xl border dark:bg-gray-900 shadow-sm overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 dark:bg-black/40 backdrop-blur-sm">
            <Spinner size="large">
              <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Đang tải dữ liệu...
              </span>
            </Spinner>
          </div>
        )}
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler?.()}
                      className={cn(
                        'px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300',
                        header.column.getCanSort() &&
                          'cursor-pointer select-none',
                      )}
                    >
                      <div className="flex items-center space-x-2">
                        <span>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </span>
                        {header.column.getCanSort() && (
                          <span className="text-gray-500">
                            {{
                              asc: '↑',
                              desc: '↓',
                            }[header.column.getIsSorted() as string] ?? '↕'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="min-h-[400px]">
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="text-center py-6 text-gray-500 dark:text-gray-400"
                  >
                    Đang tải...
                  </TableCell>
                </TableRow>
              ) : hasData ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    className={cn(
                      'transition-colors',
                      index % 2 === 0
                        ? 'bg-white dark:bg-gray-900'
                        : 'bg-gray-50 dark:bg-gray-800',
                      'hover:bg-gray-100 dark:hover:bg-gray-700',
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-4 py-3 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="text-center py-6 text-gray-500 dark:text-gray-400"
                  >
                    Không tìm thấy quyền nào.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {pageCount > 0 && (
        <PaginationControls
          currentPage={currentPage}
          pageCount={pageCount}
          setPage={setPage}
          table={table}
          setLimit={setLimit}
          maxPagesToShow={5}
        />
      )}
    </div>
  );
};

export default PaymentTable;

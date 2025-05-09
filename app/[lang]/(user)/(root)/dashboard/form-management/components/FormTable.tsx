import ModalDetailForm from '@/app/[lang]/(user)/(root)/dashboard/form-management/components/ModalDetailForm';
import GenericTable from '@/components/ui/Table';
import { Form } from '@/shared/types/form';
import { formatDate } from '@/shared/utils';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

const columnHelper = createColumnHelper<Form>();

const FormTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectId, setSelectId] = useState('');

  const forms: Form[] = [
    {
      id: 1,
      name: 'Form 1',
      type: 'buy',
      status: 'pending',
      created_at: '2021-01-01',
    },
    {
      id: 2,
      name: 'Form 2',
      type: 'buy',
      status: 'completed',
      created_at: '2021-04-01',
    },
  ];

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Tên',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-900">
              {row.original.name}
            </p>
          </div>
        ),
        sortingFn: 'alphanumeric',
      }),
      columnHelper.accessor('type', {
        header: 'Loại',
        cell: ({ getValue }) => {
          const value = getValue();
          return (
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                value === 'buy'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {value}
            </span>
          );
        },
      }),
      columnHelper.accessor('created_at', {
        header: 'Ngày tạo',
        cell: ({ getValue }) => formatDate(getValue()),
        sortingFn: 'datetime',
      }),
      columnHelper.accessor('status', {
        header: 'Trạng thái',
        cell: ({ getValue }) => {
          const value = getValue();
          const isActive = value === 'completed';
          return (
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isActive
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full mr-1 ${
                  isActive ? 'bg-green-500' : 'bg-gray-500'
                }`}
              ></span>
              {isActive ? 'Hoạt động' : 'Không hoạt động'}
            </span>
          );
        },
      }),
      columnHelper.accessor('id', {
        header: 'Hành động',
        cell: ({ getValue }) => {
          const value = getValue();
          return (
            <button
              className="text-blue-500"
              onClick={() => {
                setIsOpen(true);
                setSelectId(String(value));
              }}
              aria-label={`Xem chi tiết form ${value}`}
            >
              Xem
            </button>
          );
        },
        enableSorting: false,
      }),
    ],
    [],
  );

  return (
    <>
      <GenericTable<Form>
        data={forms}
        columns={columns as ColumnDef<Form>[]}
        className="mt-4"
      />
      <ModalDetailForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        id={selectId}
      />
    </>
  );
};

export default FormTable;

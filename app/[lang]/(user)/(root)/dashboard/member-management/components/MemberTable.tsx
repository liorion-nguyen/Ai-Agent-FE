import { useGetMembers } from '@/app/[lang]/(user)/(root)/dashboard/member-management/hooks/useMember';
import { Skeleton } from '@/components/ui/Skeleton';
import GenericTable from '@/components/ui/Table';
import { Member } from '@/shared/types/member';
import { formatDate } from '@/shared/utils';
import useMemberStore from '@/store/member';
import useUserStore from '@/store/user';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import ModalDetailMember from './ModalDetailMeber';

const columnHelper = createColumnHelper<Member>();

const MemberTable = () => {
  const { getMembers, loading } = useGetMembers();
  const { user, workspace, hydrated } = useUserStore();
  const { members } = useMemberStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectId, setSelectId] = useState('');

  useEffect(() => {
    if (user && workspace && !hydrated) {
      getMembers({
        user_id: user.id,
        workspace_id: workspace.id,
      });
    }
  }, [user, workspace, hydrated, getMembers]);

  const columns = [
    columnHelper.accessor('user', {
      header: 'Tên',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600">
              {row.original.user.fullname.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {row.original.user.fullname}
            </p>
            <p className="text-xs text-gray-500">{row.original.user.email}</p>
          </div>
        </div>
      ),
      sortingFn: (rowA, rowB) =>
        rowA.original.user.fullname.localeCompare(rowB.original.user.fullname),
    }),
    columnHelper.accessor('role', {
      header: 'Vai trò',
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              value === 'Chủ sở hữu'
                ? 'bg-purple-100 text-purple-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {value}
          </span>
        );
      },
    }),
    columnHelper.accessor('user', {
      header: 'Số điện thoại',
      cell: ({ row }) => row.original.user.username,
      enableSorting: false,
    }),
    columnHelper.accessor('created_at', {
      header: 'Ngày tạo',
      cell: ({ getValue }) => formatDate(getValue()),
      sortingFn: 'datetime',
    }),
    columnHelper.accessor('user', {
      header: 'Hoạt động',
      cell: () => {
        const value = true;
        return (
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              value
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full mr-1 ${
                value ? 'bg-green-500' : 'bg-gray-500'
              }`}
            ></span>
            {value ? 'Hoạt động' : 'Không hoạt động'}
          </span>
        );
      },
    }),
    columnHelper.accessor('user', {
      header: 'Hành động',
      cell: ({ row }) => (
        <button
          className="text-blue-500"
          onClick={() => {
            setIsOpen(true);
            setSelectId(row.original.user.id);
          }}
        >
          Xem
        </button>
      ),
      enableSorting: false,
    }),
  ];

  return (
    <>
      {loading ? (
        <Skeleton className="w-full h sprayed-500px]" />
      ) : (
        <GenericTable<Member>
          data={members}
          columns={columns as ColumnDef<Member>[]}
          className="mt-4"
        />
      )}
      <ModalDetailMember
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        id={selectId}
      />
    </>
  );
};

export default MemberTable;

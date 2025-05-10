import ModalDetailMember from '@/app/[lang]/(user)/(root)/dashboard/member-management/components/ModalDetailMeber';
import { useDeleteMember } from '@/app/[lang]/(user)/(root)/dashboard/member-management/hooks/useMember';
import { Button } from '@/components/ui/Button';
import { MemberRole } from '@/shared/constants/member';
import { useGenerateColumns } from '@/shared/hooks';
import { MemberList } from '@/shared/types';
import useMemberStore from '@/store/member';
import useUserStore from '@/store/user';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
export function useMemberColumns(): ReturnType<
  typeof useGenerateColumns<MemberList>
> {
  const { deleteMember } = useDeleteMember();
  const { workspace } = useUserStore();
  const { members } = useMemberStore();
  const handleDelete = async (email: string) => {
    const member = members.find((member) => member.user.email == email);
    if (member) {
      await deleteMember({
        user_id: member.user.id,
        workspace_id: workspace?.id || '',
      });
    }
  };
  return useGenerateColumns<MemberList>({
    columns: [
      {
        key: 'fullname',
        header: 'Tên',
        cell: (row) => (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600">{row.fullname.charAt(0)}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {row.fullname}
              </p>
              <p className="text-xs text-gray-500">{row.email}</p>
            </div>
          </div>
        ),
      },
      {
        key: 'username',
        header: 'Username',
        cell: (row) => row.username,
      },
      {
        key: 'role',
        header: 'Vai trò',
        cell: (row) => (
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              row.role === MemberRole.ADMIN
                ? 'bg-purple-100 text-purple-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {row.role}
          </span>
        ),
      },
      {
        key: 'created_at',
        header: 'Ngày tạo',
        cell: (row) => (
          <span>
            {format(new Date(row.created_at || ''), 'dd/MM/yyyy', {
              locale: vi,
            })}
          </span>
        ),
      },
      {
        key: 'actions',
        header: 'Thao tác',
        cell: function ActionsCell(row) {
          const [isOpen, setIsOpen] = useState(false);

          return (
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="transition-transform duration-200 hover:scale-110 hover:text-blue-500"
                onClick={() => setIsOpen(true)}
              >
                <Pencil size={16} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="transition-transform duration-200 hover:scale-110 hover:text-red-500"
                onClick={() => handleDelete(row.email)}
              >
                <Trash size={16} />
              </Button>
              <ModalDetailMember
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                email={row.email}
                role={row.role}
              />
            </div>
          );
        },
      },
    ],
  });
}

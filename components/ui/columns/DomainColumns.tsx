import ModalDetailDomain from '@/app/[lang]/(user)/(root)/dashboard/domain-management/components/ModalDetailDomain';
import { Button } from '@/components/ui/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { useGenerateColumns, useVerifyDomain } from '@/shared/hooks';
import { DomainList } from '@/shared/types/domain';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Pencil, ShieldCheck, Trash } from 'lucide-react';
import { useState } from 'react';

export function useDomainColumns(): ReturnType<
  typeof useGenerateColumns<DomainList>
> {
  const { verifyDomain } = useVerifyDomain();
  return useGenerateColumns<DomainList>({
    columns: [
      {
        key: 'id',
        header: 'ID',
        cell: (row) => (
          <TooltipProvider>
            <Tooltip delayDuration={1}>
              <TooltipTrigger asChild>
                <span className="cursor-pointer text-sm font-mono text-gray-700">
                  {row.id.toString().slice(0, 6)}...
                </span>
              </TooltipTrigger>
              <TooltipContent side="top">
                <span>{row.id}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ),
      },
      { key: 'name', header: 'Name' },
      {
        key: 'isVerified',
        header: 'Trạng thái',
        cell: function StatusCell(row) {
          return row.isVerified ? <p>Đã xác thực</p> : <p>Chưa xác thực</p>;
        },
      },
      {
        key: 'created_at',
        header: 'Ngày tạo',
        cell: (row) =>
          format(new Date(row.created_at || ''), 'dd/MM/yyyy', { locale: vi }),
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
                onClick={() => console.log('Delete', row.id)}
              >
                <Trash size={16} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="transition-transform duration-200 hover:scale-110 hover:text-green-500"
                onClick={() => verifyDomain(row.id.toString())}
              >
                <ShieldCheck size={16} />
              </Button>
              <ModalDetailDomain
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                id={row.id.toString()}
              />
            </div>
          );
        },
      },
    ],
  });
}

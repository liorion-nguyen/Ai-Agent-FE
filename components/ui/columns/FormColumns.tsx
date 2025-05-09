import ModalDetailForm from '@/app/[lang]/(user)/(root)/dashboard/form-management/components/ModalDetailForm';
import { Button } from '@/components/ui/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { useGenerateColumns } from '@/shared/hooks';
import { FormList } from '@/shared/types/form';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

export function useFormColumns(): ReturnType<
  typeof useGenerateColumns<FormList>
> {
  return useGenerateColumns<FormList>({
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
      { key: 'name', header: 'Tên quyền' },
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
              <ModalDetailForm
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

import ModalDetailPayment from '@/app/[lang]/(user)/(root)/dashboard/payment-management/components/ModalDetailPayment';
import { Button } from '@/components/ui/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { useGenerateColumns } from '@/shared/hooks';
import { PaymentList } from '@/shared/types';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

export function usePaymentColumns(): ReturnType<
  typeof useGenerateColumns<PaymentList>
> {
  return useGenerateColumns<PaymentList>({
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
      { key: 'amount', header: 'Số tiền' },
      { key: 'payment_method', header: 'Phương thức thanh toán' },
      {
        key: 'status',
        header: 'Trạng thái',
        cell: (row) => (
          <p className="capitalize">
            {row.status === 'success' ? 'Thành công' : 'Thất bại'}
          </p>
        ),
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
              <ModalDetailPayment
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

import ModalCreateRequest from '@/app/[lang]/(user)/(root)/dashboard/support-tickets/components/ModalCreateRequest';
import { Plus } from 'lucide-react';
import { useState } from 'react';
export default function HeaderTicket() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-between items-center bg-white p-4 border-b border-gray-200 min-h-max md:min-h-[65px] md:max-h-[65px]">
      <h3 className="text-xl font-bold">Hỗ trợ yêu cầu ticket</h3>
      <button
        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => setIsOpen(true)}
      >
        <Plus />
        Tạo yêu cầu mới
      </button>
      <ModalCreateRequest isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

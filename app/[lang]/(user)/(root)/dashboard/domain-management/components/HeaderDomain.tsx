import ModalAddDomain from '@/app/[lang]/(user)/(root)/dashboard/domain-management/components/ModalAddDomain';
import { Plus } from 'lucide-react';
import { useState } from 'react';
export default function HeaderDomain() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-between items-center bg-white p-4 border-b border-gray-200 min-h-max md:min-h-[65px] md:max-h-[65px]">
      <h3 className="text-xl font-bold">Quản lý domain</h3>
      <div className="flex flex-col-reverse md:flex-row items-center gap-5">
        <button
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setIsOpen(true)}
        >
          <Plus />
          Thêm domain
        </button>
      </div>
      <ModalAddDomain isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

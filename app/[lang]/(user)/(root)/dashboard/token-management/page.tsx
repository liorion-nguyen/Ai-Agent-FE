'use client';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import ModalAddToken from './components/ModalAddToken';
import ViewTokens from './components/ViewTokens';
export default function TokenManagementPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white">
      <div className="flex justify-between items-center bg-white p-4 border-b border-gray-200 min-h-[65px] max-h-[65px]">
        <h3 className="text-xl font-bold">Quản lý token</h3>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
          onClick={() => setIsOpen(true)}
        >
          <Plus />
          Add token
        </button>
        <ModalAddToken isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
      <div className="flex h-[calc(100vh-65px)]">
        <ViewTokens />
      </div>
    </div>
  );
}

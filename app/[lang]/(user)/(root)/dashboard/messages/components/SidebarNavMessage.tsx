'use client';

import { Progress } from '@/components/ui/Progress';
import Search from '@/components/ui/Search';
import { useState } from 'react';

export default function SidebarNavMessage() {
  const [search, setSearch] = useState('');

  return (
    <div className="flex flex-col gap-4 p-4 bg-white border-r border-gray-200 w-1/4">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Chat</h3>
        <select className="text-sm text-gray-600 border-none bg-transparent">
          <option>Tắt cả kênh chat</option>
        </select>
      </div>

      <div>
        <Search value={search} onChange={setSearch} placeholder="Tìm kiếm" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm">
          <p>Cuộc hội thoại</p>
          <p>0 / 2.000</p>
        </div>
        <Progress value={(0 / 2000) * 100} className="h-2 mt-1 bg-gray-200" />
      </div>

      <div className="flex justify-between items-center text-sm">
        <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
          <span>↑↓</span> Gắn nhãn
        </button>
        <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
          <span>≡</span> Lọc
        </button>
      </div>

      <div className="flex flex-col items-center justify-center h-40 text-gray-500">
        <div className="text-4xl mb-2">📨</div>
        <p className="text-center">
          Bạn không có cuộc hội thoại nào đang diễn ra
        </p>
      </div>
    </div>
  );
}

'use client';
import { MessageCircleOff } from 'lucide-react';
export default function MessagesPage() {
  return (
    <div className="flex flex-col gap-4 p-4 h-screen">
      <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
        <MessageCircleOff className="w-10 h-10" />
        <p>Không có cuộc hội thoại nào đang diễn ra</p>
      </div>
    </div>
  );
}

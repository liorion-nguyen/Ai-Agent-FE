'use client';

import Img from '@/components/ui/Image';
import { formatDateTime } from '@/shared/utils';
import { Settings, Trash2 } from 'lucide-react';

interface ChatbotItemProps {
  name: string;
  lastUpdated: string;
  onSettingsClick: () => void;
  onDeleteClick: () => void;
  onClick: () => void;
}

const ChatbotItem = ({
  name,
  lastUpdated,
  onSettingsClick,
  onDeleteClick,
  onClick,
}: ChatbotItemProps) => {
  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSettingsClick();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteClick();
  };

  return (
    <div
      className="flex flex-col border rounded-xl border-gray-200 mb-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3 p-4 border-b border-gray-200">
        <Img
          src="/icons/admin_icon.png"
          alt="Bot Avatar"
          className="w-10 h-10 rounded-full"
        />
        <h3 className="text-base font-medium">{name}</h3>
      </div>
      <div className="flex gap-2 p-4 items-end justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-2">Cập nhật</p>
          <p>{formatDateTime(lastUpdated)}</p>
        </div>
        <div className="flex items-center gap-2">
          <Settings onClick={handleSettingsClick} className="cursor-pointer" />
          <Trash2
            color="#db1a1a"
            onClick={handleDeleteClick}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatbotItem;

'use client';

import { cn } from '@/lib/utils';
import { Inbox } from 'lucide-react';
import * as React from 'react';
import { ModalButton } from './Modal'; // Tái sử dụng ModalButton từ các component trước

interface EmptyProps {
  icon?: React.ReactNode; // Icon tùy chỉnh (mặc định là Inbox)
  title?: string; // Tiêu đề (mặc định: "Không có dữ liệu")
  description?: string; // Mô tả (tùy chọn)
  actionLabel?: string; // Nhãn cho nút hành động (ví dụ: "Tạo mới")
  onActionClick?: () => void; // Hàm xử lý khi click nút hành động
  className?: string; // Class tùy chỉnh
}

const Empty = ({
  icon,
  title = 'Không có dữ liệu',
  description,
  actionLabel,
  onActionClick,
  className,
}: EmptyProps) => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div
        className={cn(
          'flex flex-col items-center justify-center p-8 text-center border border-gray-200 rounded-lg bg-gray-50',
          className,
        )}
      >
        {/* Icon */}
        <div className="mb-4">
          {icon || <Inbox className="w-12 h-12 text-gray-400" />}
        </div>

        {/* Tiêu đề */}
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>

        {/* Mô tả */}
        {description && (
          <p className="text-sm text-gray-500 mb-4">{description}</p>
        )}

        {/* Nút hành động (nếu có) */}
        {actionLabel && onActionClick && (
          <ModalButton variant="primary" onClick={onActionClick}>
            {actionLabel}
          </ModalButton>
        )}
      </div>
    </div>
  );
};

Empty.displayName = 'Empty';

export default Empty;

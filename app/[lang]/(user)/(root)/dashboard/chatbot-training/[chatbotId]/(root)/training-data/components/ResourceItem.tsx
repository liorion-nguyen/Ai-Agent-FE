import { TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';

import { Tooltip } from '@/components/ui/Tooltip';

import { TooltipProvider } from '@/components/ui/Tooltip';
import { cn } from '@/lib/utils';
import { formatDate } from '@/shared/utils/date';
import { Settings, Trash2 } from 'lucide-react';

interface ResourceItemProps {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  status: string;
  externalTypeName: string;
  onClick: () => void;
  onSettingsClick: () => void;
  onDeleteClick: () => void;
}

export default function ResourceItem({
  // id,
  name,
  description,
  lastUpdated,
  status,
  externalTypeName,
  onClick,
  onSettingsClick,
  onDeleteClick,
}: ResourceItemProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-800 truncate line-clamp-1">
            {name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {description}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Last Updated: {formatDate(lastUpdated)}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={cn(
                'text-xs font-medium px-2 py-1 rounded-full',
                status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700',
              )}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
              {externalTypeName}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSettingsClick();
                  }}
                  className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteClick();
                  }}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

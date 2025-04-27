import { cn } from '@/lib/utils';

export const ToolbarButton = ({
  label,
  icon,
  onClick,
  badge,
  className,
}: {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  badge?: number;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
        className ||
          'text-purple-600 hover:bg-purple-50 border border-purple-200',
      )}
    >
      {icon}
      <span>{label}</span>
      {badge !== undefined && (
        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
          {badge}
        </span>
      )}
    </button>
  );
};

// components/ui/Progress.tsx
import { cn } from '@/lib/utils';
import * as React from 'react';

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: number }
>(({ className, value, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-gray-600',
        className,
      )}
      {...props}
    >
      <div className="h-full bg-gray-400" style={{ width: `${value}%` }} />
    </div>
  );
});
Progress.displayName = 'Progress';

export { Progress };

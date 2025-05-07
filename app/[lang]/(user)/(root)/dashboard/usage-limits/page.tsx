'use client';

import BoxChart from '@/app/[lang]/(user)/(root)/dashboard/usage-limits/components/BoxChart';

export default function UsageLimitsPage() {
  return (
    <div className="bg-white">
      <div className="flex justify-between items-center bg-white p-4 border-b border-gray-200 min-h-[65px] max-h-[65px]">
        <h3 className="text-xl font-bold">Quản lý hạn sử dụng</h3>
      </div>
      <div className="flex h-[calc(100vh-65px)]">
        <BoxChart />
      </div>
    </div>
  );
}

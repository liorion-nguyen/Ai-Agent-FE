'use client';
import { default as DomainTable } from '@/app/[lang]/(user)/(root)/dashboard/domain-management/components/DomainTable';
import HeaderDomain from '@/app/[lang]/(user)/(root)/dashboard/domain-management/components/HeaderDomain';

export default function FormManagementPage() {
  return (
    <div className="bg-white">
      <HeaderDomain />
      <div className="flex w-full h-[calc(100vh-65px)] p-4">
        <DomainTable />
      </div>
    </div>
  );
}

'use client';
import HeaderMember from '@/app/[lang]/(user)/(root)/dashboard/member-management/components/HeaderMember';
import MemberTable from '@/app/[lang]/(user)/(root)/dashboard/member-management/components/MemberTable';
export default function MemberManagementPage() {
  return (
    <div className="bg-white">
      <HeaderMember />
      <div className="flex w-full h-[calc(100vh-65px)] p-4">
        <MemberTable />
      </div>
    </div>
  );
}

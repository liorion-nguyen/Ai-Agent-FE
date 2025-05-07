'use client';
import HeaderTicket from '@/app/[lang]/(user)/(root)/dashboard/support-tickets/components/HeaderTicket';
import TicketTable from '@/app/[lang]/(user)/(root)/dashboard/support-tickets/components/TicketTable';
export default function SupportTicketPage() {
  return (
    <div className="bg-white">
      <HeaderTicket />
      <div className="flex w-full h-[calc(100vh-65px)] p-4">
        <TicketTable />
      </div>
    </div>
  );
}

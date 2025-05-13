'use client';

import HistoryBoxChat from '@/app/[lang]/(user)/(root)/dashboard/messages/[dialogId]/components/HistoryBoxChat';

export default function MessagePage() {
  return (
    <div className="flex flex-col gap-4 p-4 h-screen">
      <HistoryBoxChat />
    </div>
  );
}

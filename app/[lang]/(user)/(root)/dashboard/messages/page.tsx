'use client';
import HistoryBoxChat from './components/HistoryBoxChat';
export default function MessagesPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <HistoryBoxChat />
    </div>
  );
}

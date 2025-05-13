import { useGetDialogBoxMessages } from '@/app/[lang]/(user)/(root)/dashboard/messages/[dialogId]/hooks/useHistoryBoxChat';
import ItemMessage from '@/components/ui/ItemMessage';
import { useMessageStore } from '@/store/message';
import { MessageCircleOff } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function HistoryBoxChat() {
  const { dialogBoxMessages } = useMessageStore();
  const { dialogId } = useParams<{ dialogId: string }>();
  const { getDialogBoxMessages } = useGetDialogBoxMessages();

  useEffect(() => {
    getDialogBoxMessages({ dialog_box_id: dialogId });
  }, [dialogId]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 p-6 overflow-y-auto">
        {dialogBoxMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <MessageCircleOff className="w-10 h-10 mb-2" />
            <p>Không có cuộc hội thoại nào đang diễn ra</p>
          </div>
        ) : (
          <div className="space-y-4">
            {dialogBoxMessages.map((msg) => (
              <ItemMessage key={msg.id} message={msg} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

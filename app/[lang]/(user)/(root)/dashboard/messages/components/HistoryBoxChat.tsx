import { MessageCircleOff } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HistoryBoxChat() {
  const [conversation, setConversation] = useState([]);
  useEffect(() => {
    setConversation([]);
  }, []);
  return (
    <div>
      {conversation.length == 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-gray-500">
          <MessageCircleOff className="w-10 h-10" />
          <p>Không có cuộc hội thoại nào đang diễn ra</p>
        </div>
      ) : (
        <div>oke oke</div>
      )}
    </div>
  );
}

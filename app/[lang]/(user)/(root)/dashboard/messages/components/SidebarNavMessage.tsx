'use client';

import { useGetDialogBoxs } from '@/app/[lang]/(user)/(root)/dashboard/messages/hooks/useGetDialogBoxs';
import { Progress } from '@/components/ui/Progress';
import Search from '@/components/ui/Search';
import useChatbotStore from '@/store/chatbot';
import { useMessageStore } from '@/store/message';
import useSubscriptionStore from '@/store/subscription';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function SidebarNavMessage() {
  const [selectedChatbot, setSelectedChatbot] = useState<string>('');
  const [search, setSearch] = useState('');
  const { chatbots } = useChatbotStore();
  const { remainingLimits, subscription } = useSubscriptionStore();
  const { getDialogBoxs } = useGetDialogBoxs();
  const { dialogBoxs } = useMessageStore();
  const { dialogId } = useParams<{ dialogId: string }>();
  const router = useRouter();

  const messageProgress = useMemo(() => {
    if (remainingLimits && subscription?.subscription.message_limit) {
      return (
        subscription?.subscription.message_limit - remainingLimits?.message || 0
      );
    }
    return 0;
  }, [remainingLimits, subscription]);

  const handleToMessagePage = (dialogId: string) => {
    router.push(`/dashboard/messages/${dialogId}`);
  };

  useEffect(() => {
    if (chatbots.length > 0) {
      getDialogBoxs({
        chatbot_id: selectedChatbot,
      });
    }
  }, [chatbots]);

  return (
    <div className="flex flex-col gap-4 p-4 bg-white border-r border-gray-200 w-1/4 h-screen">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Chat</h3>
        <select
          className="text-sm text-gray-600 border-none bg-transparent"
          onChange={(e) => setSelectedChatbot(e.target.value)}
        >
          <option value="">Chọn chatbot</option>
          {chatbots.map((chatbot) => (
            <option key={chatbot.id} value={chatbot.id}>
              {chatbot.chatbot_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Search value={search} onChange={setSearch} placeholder="Tìm kiếm" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <p>Cuộc hội thoại</p>
          <p>
            {messageProgress} / {subscription?.subscription.message_limit || 0}
          </p>
        </div>
        <Progress
          value={
            (messageProgress /
              (subscription?.subscription.message_limit || 1)) *
            100
          }
          className="h-2 mt-1 bg-gray-200"
        />
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600">
        <button className="flex items-center gap-1 hover:text-gray-800">
          <span>↑↓</span> Gắn nhãn
        </button>
        <button className="flex items-center gap-1 hover:text-gray-800">
          <span>≡</span> Lọc
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {dialogBoxs.length > 0 ? (
          <div className="space-y-2">
            {dialogBoxs.map((dialogBox) => (
              <div
                key={dialogBox.id}
                className={`flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer ${dialogId === dialogBox.id ? 'bg-gray-100' : ''}`}
                onClick={() => handleToMessagePage(dialogBox.id)}
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-yellow-800">N</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        {dialogBox.name || 'Unknown User'}
                      </span>
                      <span className="text-xs text-gray-500">...</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {/* {dialogBox.last_message || 'No message'} */}
                      Xin chào
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500">
                    {/* {dialogBox.timestamp || '08:32'} */}
                    08:32
                  </span>
                  <div className="flex gap-1 mt-1">
                    <button className="text-gray-500 hover:text-gray-700">
                      <span>✏️</span>
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <span>🌐</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="text-4xl mb-2">📨</div>
            <p className="text-center">
              Bạn không có cuộc hội thoại nào đang diễn ra
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

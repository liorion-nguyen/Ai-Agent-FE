'use client';

import { useGetChatbots } from '@/app/[lang]/(user)/(root)/dashboard/chatbot-training/hooks/useChatbot';
import { Button } from '@/components/ui/Button';
import Empty from '@/components/ui/Empty';
import { Skeleton } from '@/components/ui/Skeleton';
import useChatbotStore from '@/store/chatbot';
import { Bot } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChatbotItem from './components/ChatbotItem';
import CreateChatbotModal from './components/CreateChatbotModal';
import DeleteChatbotModal from './components/DeleteChatbotModal';

interface ChatbotDeleteParams {
  chatbot_id: string;
  chatbot_name: string;
  open: boolean;
}

const ChatbotTrainingPage = () => {
  const router = useRouter();
  const { chatbots, hydrated } = useChatbotStore();
  const { getChatbots, loading } = useGetChatbots();

  useEffect(() => {
    if (!hydrated) return;

    getChatbots();
    // if (chatbots.length === 0) {
    // }
  }, [hydrated, getChatbots]);
  const handleSettingsClick = (name: string) => {
    console.log(`Mở cài đặt cho chatbot: ${name}`);
  };

  const handleDeleteClick = (chatbot_id: string) => {
    setIsOpenDelete({
      chatbot_id: chatbot_id,
      chatbot_name:
        chatbots.find((chatbot) => chatbot.id === chatbot_id)?.chatbot_name ||
        '',
      open: true,
    });
  };

  const handleClick = (chatbot_id: string) => {
    router.push(`/dashboard/chatbot-training/${chatbot_id}`);
  };
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState<ChatbotDeleteParams>({
    chatbot_id: '',
    chatbot_name: '',
    open: false,
  });
  return (
    <div className="p-6 w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2">
          <Bot className="w-7 h-7" />
          <h1 className="text-2xl font-bold">Đào tạo chatbot</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="bg-purple-500 text-white hover:bg-purple-600"
            data-modal-target="default-modal"
            data-modal-toggle="default-modal"
            onClick={() => setIsOpenCreate(true)}
          >
            <span className="mr-1">+</span> Tạo chatbot
          </Button>
          <CreateChatbotModal
            isOpen={isOpenCreate}
            setIsOpen={setIsOpenCreate}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 space-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-[150px] w-full" />
          ))
        ) : chatbots.length > 0 ? (
          chatbots.map((chatbot) => (
            <ChatbotItem
              key={chatbot.chatbot_name}
              name={chatbot.chatbot_name}
              lastUpdated={chatbot.updated_at || ''}
              onClick={() => handleClick(chatbot.id)}
              onSettingsClick={() => handleSettingsClick(chatbot.chatbot_name)}
              onDeleteClick={() => handleDeleteClick(chatbot.id)}
            />
          ))
        ) : (
          <div className="col-span-1 lg:col-span-3">
            <Empty
              icon={<Bot className="w-12 h-12 text-purple-500" />}
              title="Không có chatbot"
              description="Hãy tạo một chatbot để bắt đầu trò chuyện!"
            />
          </div>
        )}
      </div>
      <DeleteChatbotModal
        data={isOpenDelete}
        onClose={() =>
          setIsOpenDelete({
            chatbot_id: '',
            chatbot_name: '',
            open: false,
          })
        }
      />
    </div>
  );
};

export default ChatbotTrainingPage;

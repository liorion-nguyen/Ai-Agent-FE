'use client';

import ChatbotInfoForm from '@/app/[lang]/(user)/(root)/dashboard/chatbot-training/[chatbotId]/(root)/overview/components/ChatbotInfoForm';
import PreviewChat from '@/app/[lang]/(user)/(root)/dashboard/chatbot-training/[chatbotId]/(root)/overview/components/PreviewChat';
import PublishChatbot from '@/app/[lang]/(user)/(root)/dashboard/chatbot-training/[chatbotId]/(root)/overview/components/PublishChatbot';
export default function OverviewPage() {
  return (
    <div className="bg-white">
      <div className="flex justify-between items-center bg-white p-4 border-b border-gray-200 min-h-[65px] max-h-[65px]">
        <h3 className="text-xl font-bold">Tổng quan</h3>
        <div className="flex gap-2">
          <PublishChatbot />
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md">
            Lưu thay đổi
          </button>
        </div>
      </div>
      <div className="flex h-[calc(100vh-65px)]">
        <div className="w-1/2 p-4 h-full overflow-y-auto">
          <ChatbotInfoForm />
        </div>
        <div className="w-1/2 flex justify-center bg-gray-100 p-4 h-full">
          <PreviewChat />
        </div>
      </div>
    </div>
  );
}

'use client';
import ChatbotTokenForm from './components/ChatbotTokenForm';
import SectionIframe from './components/SectionIframe';
export default function IframeWebsitePage() {
  return (
    <div className="bg-white">
      <div className="flex justify-between items-center bg-white p-4 border-b border-gray-200 min-h-[65px] max-h-[65px]">
        <h3 className="text-xl font-bold">
          Tích hợp chatbot vào website
        </h3>
      </div>
      <div className="flex h-[calc(100vh-65px)] flex-col gap-4 p-4 overflow-y-auto">
        <ChatbotTokenForm />
        <SectionIframe />
      </div>
    </div>
  );
}

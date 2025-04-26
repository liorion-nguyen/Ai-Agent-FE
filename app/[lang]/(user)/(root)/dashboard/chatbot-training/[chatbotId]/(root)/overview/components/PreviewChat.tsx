import { MessageSquare } from 'lucide-react';
import Image from 'next/image';

export default function PreviewChat() {
  return (
    <div className="bg-white rounded-lg shadow flex flex-col h-[500px] w-2/3">
      <div className="flex items-center gap-2 mb-4 border-b border-gray-200 p-4">
        <Image
          width={32}
          height={32}
          src="/icons/admin_icon.png"
          alt="Chatbot Avatar"
          className="w-8 h-8 rounded-full"
        />
        <h3 className="text-lg font-semibold">Chatbot</h3>
      </div>

      {/* Nội dung chat */}
      <div className="flex flex-col flex-1 overflow-y-auto space-y-4 justify-end p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 justify-start">
          <Image
            width={32}
            height={32}
            src="/icons/admin_icon.png"
            alt="Chatbot Avatar"
            className="w-8 h-8 rounded-full"
          />
          <p>👋 Hello! How can I help you today?</p>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <p className="text-sm text-white bg-purple-500 rounded-lg p-2 w-fit">
            My email is example@example.com
          </p>
        </div>
      </div>

      {/* Nút Chat với */}
      <button className="mt-4 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 flex items-center justify-center gap-2 m-4">
        Chat với
        <MessageSquare className="w-5 h-5" />
      </button>
    </div>
  );
}

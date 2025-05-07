import { useGetTokens } from '@/app/[lang]/(user)/(root)/dashboard/token-management/hooks/useToken';
import { ChatbotToken } from '@/shared/types/chatbot';
import useChatbotStore from '@/store/chatbot';
import { useEffect, useState } from 'react';

export default function ChatbotTokenForm() {
  const { chatbotTokens, chatbotToken, setChatbotToken } = useChatbotStore();
  const { getChatbotTokens } = useGetTokens();
  const [selectedToken, setSelectedToken] = useState<string>('');

  useEffect(() => {
    getChatbotTokens();
  }, [getChatbotTokens]);

  useEffect(() => {
    if (chatbotToken) {
      setSelectedToken(chatbotToken.id);
    }
  }, [chatbotToken]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = chatbotTokens.find((t) => t.id === selectedToken);
    if (token) {
      setChatbotToken(token);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Token</label>
        <select
          value={selectedToken}
          onChange={(e) => setSelectedToken(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="" disabled>
            Chọn một token
          </option>
          {chatbotTokens.map((token: ChatbotToken) => (
            <option key={token.id} value={token.id}>
              {token.token.substring(0, 30)}... (ID: {token.id})
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={!selectedToken}
        className={`px-4 py-2 rounded-lg text-white ${
          selectedToken
            ? 'bg-purple-500 hover:bg-purple-600'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        Xác nhận
      </button>
    </form>
  );
}

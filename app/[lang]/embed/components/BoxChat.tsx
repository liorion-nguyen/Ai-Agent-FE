'use client';

import ItemMessage from '@/app/[lang]/embed/components/ItemMessage';
import { messageApi } from '@/services/endpoints';
import { toast } from '@/shared/hooks';
import { MessageType } from '@/shared/types/chatbot';
import { processStreamData } from '@/shared/utils/stream';
import useMessageStore from '@/store/message';
import { MessageCircle, MessageSquareOff, Plus, Send, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useInitCheckActiveChatbot } from '../hooks/useMessage';

const BoxChat = () => {
  const searchParams = useSearchParams();
  const chatbotId = searchParams.get('chatbotId');
  const userId = searchParams.get('userId');
  const token = searchParams.get('token');
  const { initCheckActiveChatbot } = useInitCheckActiveChatbot();
  const { conversationId, hydrated } = useMessageStore();
  useEffect(() => {
    if (token && chatbotId && userId && !conversationId && hydrated) {
      initCheckActiveChatbot({
        user_id: userId,
        chatbot_id: chatbotId,
        api_token: token,
      });
    }
  }, [token, chatbotId, userId, conversationId, hydrated, initCheckActiveChatbot]);

  const { messages, addMessage, clearMessages, isStreaming } =
    useMessageStore();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  // Handle iframe styling
  useEffect(() => {
    const isInIframe = window.self !== window.top;
    if (isInIframe) {
      const container = document.getElementById('chatbot-container');
      if (container) {
        container.style.pointerEvents = 'auto';
        container.style.zIndex = '10000';
      }
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    if (!chatbotId || !userId) {
      toast({
        title: 'Error',
        description: 'Missing chatbot or user information.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Add user message
      const userMessage: MessageType = {
        id: crypto.randomUUID(),
        content: inputValue,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sender: 'user',
      };
      addMessage(userMessage);
      setInputValue('');

      // Set streaming state
      useMessageStore.getState().setStreaming(true);

      // Send message to API
      const stream = await messageApi.sendMessage({
        userId,
        chatbotId,
        message: inputValue,
        conversationId,
      });

      const reader = stream.getReader();
      await processStreamData(reader);
    } catch (error) {
      useMessageStore.getState().setStreaming(false);
      toast({
        title: 'Error',
        description: 'Failed to send message.',
        variant: 'destructive',
      });
      console.error('Send message error:', error);
    }
  };

  const handleClearMessages = () => {
    clearMessages();
    setInputValue('');
  };

  return (
    <div id="chatbot-container">
      {/* Chatbot toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-[9999] bg-purple-600 text-white rounded-full p-4 shadow-lg hover:bg-purple-700 transition"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chatbox */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-96 h-[520px] z-[10000] bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              L-Edu Assistant
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearMessages}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <MessageSquareOff className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.length === 0 && !isStreaming ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <p>Start a conversation!</p>
                </div>
              ) : (
                <>
                  {messages.map((msg: MessageType, idx: number) => (
                    <ItemMessage key={idx} message={msg} />
                  ))}
                  {isStreaming && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        B
                      </div>
                      <p>Typing...</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="w-full px-4 py-2 border border-purple-500 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <button className="text-gray-500 hover:text-gray-700 transition">
                  <Plus className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="text-purple-600 hover:text-purple-700 transition"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              This content is generated by AI and may not be accurate.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoxChat;

// store/chatbot.ts
import { Chatbot, ChatbotToken } from '@/shared/types/chatbot';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ChatbotState {
  chatbots: Chatbot[];
  chatbot: Chatbot | undefined;
  hydrated: boolean;
  chatbotTokens: ChatbotToken[];
  chatbotToken: ChatbotToken | undefined;
  setChatbots: (newChatbots: Chatbot[]) => void;
  setChatbot: (newChatbot: Chatbot) => void;
  resetChatbot: () => void;
  resetChatbots: () => void;
  setChatbotTokens: (newChatbotTokens: ChatbotToken[]) => void;
  resetChatbotTokens: () => void;
  setHydrated: (value: boolean) => void;
  setChatbotToken: (newChatbotToken: ChatbotToken) => void;
  resetChatbotToken: () => void;
}

const useChatbotStore = create<ChatbotState>()(
  devtools(
    persist(
      (set) => ({
        chatbots: [],
        chatbot: undefined,
        chatbotTokens: [],
        chatbotToken: undefined,
        hydrated: false,
        setChatbots: (newChatbots) => set({ chatbots: newChatbots }),
        setChatbot: (newChatbot) => set({ chatbot: newChatbot }),
        resetChatbot: () => set({ chatbot: undefined }),
        resetChatbots: () => set({ chatbots: [] }),
        setChatbotTokens: (newChatbotTokens) =>
          set({ chatbotTokens: newChatbotTokens }),
        resetChatbotTokens: () => set({ chatbotTokens: [] }),
        setHydrated: (value) => set({ hydrated: value }),
        setChatbotToken: (newChatbotToken) =>
          set({ chatbotToken: newChatbotToken }),
        resetChatbotToken: () => set({ chatbotToken: undefined }),
      }),
      {
        name: 'chatbot-storage',
        onRehydrateStorage: () => (state) => {
          state?.setHydrated(true);
        },
      },
    ),
  ),
);

export default useChatbotStore;

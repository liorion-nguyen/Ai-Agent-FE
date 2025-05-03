// store/chatbot.ts
import { Chatbot } from '@/shared/types/chatbot';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ChatbotState {
  chatbots: Chatbot[];
  chatbot: Chatbot | undefined;
  hydrated: boolean;
  setChatbots: (newChatbots: Chatbot[]) => void;
  setChatbot: (newChatbot: Chatbot) => void;
  resetChatbot: () => void;
  resetChatbots: () => void;
  setHydrated: (value: boolean) => void;
}

const useChatbotStore = create<ChatbotState>()(
  devtools(
    persist(
      (set) => ({
        chatbots: [],
        chatbot: undefined,
        messages: [],
        hydrated: false,
        setChatbots: (newChatbots) => set({ chatbots: newChatbots }),
        setChatbot: (newChatbot) => set({ chatbot: newChatbot }),
        resetChatbot: () => set({ chatbot: undefined }),
        resetChatbots: () => set({ chatbots: [] }),
        setHydrated: (value) => set({ hydrated: value }),
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

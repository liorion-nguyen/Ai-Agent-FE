// store/chatbot.ts
import { GetScriptIframeResponse } from '@/services/types/chatbot';
import { Chatbot, ChatbotEmbed, ChatbotToken } from '@/shared/types/chatbot';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ChatbotState {
  chatbots: Chatbot[];
  chatbot: Chatbot | undefined;
  hydrated: boolean;
  chatbotTokens: ChatbotToken[];
  chatbotToken: ChatbotToken | undefined;
  chatbotEmbed: ChatbotEmbed | undefined;
  scriptIframe: GetScriptIframeResponse | undefined;
  setChatbots: (newChatbots: Chatbot[]) => void;
  setChatbot: (newChatbot: Chatbot) => void;
  setChatbotEmbed: (newChatbotEmbed: ChatbotEmbed) => void;
  resetChatbotEmbed: () => void;
  resetChatbot: () => void;
  resetChatbots: () => void;
  setChatbotTokens: (newChatbotTokens: ChatbotToken[]) => void;
  resetChatbotTokens: () => void;
  setHydrated: (value: boolean) => void;
  setChatbotToken: (newChatbotToken: ChatbotToken) => void;
  resetChatbotToken: () => void;
  setScriptIframe: (newScriptIframe: GetScriptIframeResponse) => void;
  resetScriptIframe: () => void;
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
        chatbotEmbed: undefined,
        scriptIframe: undefined,
        setChatbots: (newChatbots) => set({ chatbots: newChatbots }),
        setChatbot: (newChatbot) => set({ chatbot: newChatbot }),
        setChatbotEmbed: (newChatbotEmbed) =>
          set({ chatbotEmbed: newChatbotEmbed }),
        resetChatbotEmbed: () => set({ chatbotEmbed: undefined }),
        resetChatbot: () => set({ chatbot: undefined }),
        resetChatbots: () => set({ chatbots: [] }),
        setChatbotTokens: (newChatbotTokens) =>
          set({ chatbotTokens: newChatbotTokens }),
        resetChatbotTokens: () => set({ chatbotTokens: [] }),
        setHydrated: (value) => set({ hydrated: value }),
        setChatbotToken: (newChatbotToken) =>
          set({ chatbotToken: newChatbotToken }),
        resetChatbotToken: () => set({ chatbotToken: undefined }),
        setScriptIframe: (newScriptIframe) =>
          set({ scriptIframe: newScriptIframe }),
        resetScriptIframe: () => set({ scriptIframe: undefined }),
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

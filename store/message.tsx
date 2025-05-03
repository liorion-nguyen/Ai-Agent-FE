import { MessageType } from '@/shared/types/chatbot';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface MessageState {
  messages: MessageType[];
  hydrated: boolean;
  isStreaming: boolean;
  setMessages: (newMessages: MessageType[]) => void;
  setHydrated: (value: boolean) => void;
  addMessage: (newMessage: MessageType) => void;
  updateLastBotMessage: (content: string) => void;
  setStreaming: (value: boolean) => void;
  clearMessages: () => void;
}

const useMessageStore = create<MessageState>()(
  devtools(
    persist(
      (set) => ({
        messages: [],
        hydrated: false,
        isStreaming: false,
        setMessages: (newMessages) => set({ messages: newMessages }),
        setHydrated: (value) => set({ hydrated: value }),
        addMessage: (newMessage) =>
          set((state) => ({
            messages: [...state.messages, newMessage],
          })),
        updateLastBotMessage: (content) =>
          set((state) => {
            const lastMessage = state.messages[state.messages.length - 1];
            if (lastMessage && lastMessage.sender === 'bot') {
              return {
                messages: [
                  ...state.messages.slice(0, -1),
                  {
                    ...lastMessage,
                    content,
                    updatedAt: new Date().toISOString(),
                  },
                ],
              };
            }
            return {
              messages: [
                ...state.messages,
                {
                  id: crypto.randomUUID(),
                  content,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  sender: 'bot',
                },
              ],
            };
          }),
        setStreaming: (value) => set({ isStreaming: value }),
        clearMessages: () => set({ messages: [] }),
      }),
      {
        name: 'message-storage',
        onRehydrateStorage: () => (state) => {
          state?.setHydrated(true);
        },
      },
    ),
  ),
);

export default useMessageStore;

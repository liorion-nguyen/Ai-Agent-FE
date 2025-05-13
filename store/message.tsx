import { DialogBoxType, MessageType } from '@/shared/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface MessageState {
  messages: MessageType[];
  dialogBoxs: DialogBoxType[];
  dialogBoxMessages: MessageType[];
  hydrated: boolean;
  isStreaming: boolean;
  conversationId: string;
  loading: boolean;
  error: string | null;
  setMessages: (newMessages: MessageType[]) => void;
  setHydrated: (value: boolean) => void;
  addMessage: (newMessage: MessageType) => void;
  updateLastBotMessage: (content: string) => void;
  setStreaming: (value: boolean) => void;
  clearMessages: () => void;
  setConversationId: (value: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setDialogBoxs: (newDialogBoxs: DialogBoxType[]) => void;
  setDialogBoxMessages: (newDialogBoxMessages: MessageType[]) => void;
}

export const useMessageStore = create<MessageState>()(
  devtools(
    persist(
      (set) => ({
        messages: [],
        hydrated: false,
        isStreaming: false,
        conversationId: '',
        loading: false,
        error: null,
        dialogBoxs: [],
        dialogBoxMessages: [],
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
        clearMessages: () => set({ messages: [], error: null }),
        setConversationId: (value) => set({ conversationId: value }),
        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),
        setDialogBoxs: (newDialogBoxs) => set({ dialogBoxs: newDialogBoxs }),
        setDialogBoxMessages: (newDialogBoxMessages) =>
          set({ dialogBoxMessages: newDialogBoxMessages }),
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

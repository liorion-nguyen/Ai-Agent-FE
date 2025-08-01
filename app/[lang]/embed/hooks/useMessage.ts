import { messageApi } from '@/services/endpoints';
import { APIErrorHandler } from '@/services/types';
import {
  InitCheckActiveChatbotParams,
  InitCheckActiveChatbotResponse,
} from '@/services/types/message';
import { useToast } from '@/shared/hooks';
import { processStreamData } from '@/shared/utils/stream';
import useChatbotStore from '@/store/chatbot';
import { useMessageStore } from '@/store/message';
import { useMutation } from '@tanstack/react-query';

export const useSendMessage = () => {
  const {
    addMessage,
    setLoading,
    setError,
    setStreaming,
    conversationId,
    setConversationId,
  } = useMessageStore();

  const sendMessage = async (
    chatbotId: string,
    userId: string,
    message: string,
    conversationId: string,
    token: string,
  ) => {
    try {
      setLoading(true);
      setError(null);
      setStreaming(true);

      addMessage({
        id: crypto.randomUUID(),
        content: message,
        sent_at: new Date().toISOString(),
        sender: 'user',
      });

      const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/chatbot-embed/send`;

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          conversation_id: conversationId,
          token: token,
          chatbot_id: chatbotId,
          user_id: userId,
        }),
      });

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Reader not found');
      }

      await processStreamData(reader);
    } catch (error) {
      const errorMessage = 'Gửi tin nhắn thất bại!';
      setError(errorMessage);
      setStreaming(false);
      console.error('Error:', error);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    sendMessage,
    loading: useMessageStore((state) => state.loading),
    error: useMessageStore((state) => state.error),
    conversationId,
    setConversationId,
  };
};

export const useInitCheckActiveChatbot = () => {
  const { toast } = useToast();
  const { setConversationId } = useMessageStore();
  const { setChatbotEmbed } = useChatbotStore();
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation<
    InitCheckActiveChatbotResponse,
    APIErrorHandler,
    InitCheckActiveChatbotParams
  >({
    mutationFn: messageApi.initCheckActiveChatbot,
    onSuccess: async (data) => {
      setChatbotEmbed(data.data);
      const conversation = await messageApi.createConversation({
        user_id: data.data.user.id,
        chatbot_id: data.data.id,
      });
      setConversationId(conversation.id);
    },
    onError: (err) => {
      toast({
        title: 'Chatbot hoạt động không đúng',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    initCheckActiveChatbot: mutate,
    loading,
    error,
  };
};

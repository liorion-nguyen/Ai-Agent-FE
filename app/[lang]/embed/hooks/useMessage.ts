import { messageApi } from '@/services/endpoints';
import { APIErrorHandler } from '@/services/types';
import { InitCheckActiveChatbotParams, InitCheckActiveChatbotResponse, MessageParams } from '@/services/types/message';
import { useToast } from '@/shared/hooks';
import useMessageStore from '@/store/message';
import { useMutation } from '@tanstack/react-query';

export const useSendMessage = () => {
  const { addMessage } = useMessageStore();
  const { toast } = useToast();

  const processStreamData = async (reader: ReadableStreamDefaultReader<Uint8Array>): Promise<void> => {
    const decoder = new TextDecoder('utf-8');
    let botReply = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Split into event blocks
      const eventBlocks = buffer.split('\n\n');
      buffer = eventBlocks.pop() || '';

      for (const block of eventBlocks) {
        const lines = block.trim().split('\n');
        const eventLine = lines.find((line) => line.startsWith('event:'));
        const dataLine = lines.find((line) => line.startsWith('data:'));

        if (!eventLine || !dataLine) continue;

        const eventType = eventLine.replace('event:', '').trim();
        const dataStr = dataLine.replace('data:', '').trim();

        let data;
        try {
          data = JSON.parse(dataStr);
        } catch (error) {
          console.error('Error parsing JSON:', error, 'Raw data:', dataStr);
          continue;
        }

        switch (eventType) {
          case 'conversation.message.delta':
            if (data.role === 'assistant' && data.type === 'answer') {
              botReply += data.content;
              // Update or add bot message
              const lastMessage = useMessageStore.getState().messages.slice(-1)[0];
              if (lastMessage && lastMessage.sender === 'bot') {
                addMessage({
                  ...lastMessage,
                  content: botReply,
                  updatedAt: new Date().toISOString(),
                });
              } else {
                addMessage({
                  id: crypto.randomUUID(),
                  content: botReply,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  sender: 'bot',
                });
              }
            }
            break;

          case 'conversation.message.completed':
            botReply = data.content || botReply;
            // Update or add final bot message
            const lastMessage = useMessageStore.getState().messages.slice(-1)[0];
            if (lastMessage && lastMessage.sender === 'bot') {
              addMessage({
                ...lastMessage,
                content: botReply,
                updatedAt: new Date().toISOString(),
              });
            } else {
              addMessage({
                id: crypto.randomUUID(),
                content: botReply,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                sender: 'bot',
              });
            }
            return;

          case 'done':
            return;

          default:
            break;
        }
      }
    }
  };

  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation<void, APIErrorHandler, MessageParams>({
    mutationFn: async (message) => {
      // Add user message before sending
      addMessage({
        id: crypto.randomUUID(),
        content: message.message,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sender: 'user',
      });

      const stream = await messageApi.sendMessage(message);
      const reader = stream.getReader();
      await processStreamData(reader);
    },
    onError: (err) => {
      toast({
        title: 'Gửi tin nhắn thất bại',
        description: err?.message.message || 'Đã có lỗi xảy ra',
        variant: 'destructive',
      });
    },
  });

  return {
    sendMessage: mutate,
    loading,
    error,
  };
};

export const useInitCheckActiveChatbot = () => {
  const { toast } = useToast();
  const { setConversationId } = useMessageStore();
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation<InitCheckActiveChatbotResponse, APIErrorHandler, InitCheckActiveChatbotParams>({
    mutationFn: messageApi.initCheckActiveChatbot,
    onSuccess: async (data) => {
      const conversation = await messageApi.createConversation({
        user_id: data.data.userId,
        chatbot_id: data.data.chatbotId,
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

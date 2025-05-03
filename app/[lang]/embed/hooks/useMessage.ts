import { messageApi } from '@/services/endpoints';
import { APIErrorHandler } from '@/services/types';
import { MessageParams } from '@/services/types/message';
import { useToast } from '@/shared/hooks';
import { MessageType } from '@/shared/types/chatbot';
import { processStreamData } from '@/shared/utils/stream';
import useMessageStore from '@/store/message';
import { useMutation } from '@tanstack/react-query';

export const useSendMessage = () => {
  const { toast } = useToast();
  const { addMessage } = useMessageStore();
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation<MessageType, APIErrorHandler, MessageParams>({
    mutationFn: async (message) => {
      const stream = await messageApi.sendMessage(message);
      const reader = stream.getReader();
      await processStreamData(reader);
      return {
        id: crypto.randomUUID(),
        content: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sender: 'bot',
      };
    },
    onSuccess: (data) => {
      addMessage(data);
    },
    onError: (err) => {
      toast({
        title: 'Lấy danh sách chatbot thất bại',
        description: err?.message.message,
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

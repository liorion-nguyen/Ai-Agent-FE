import { chatbotApi } from '@/services/endpoints';
import { APIErrorHandler } from '@/services/types';
import {
  ChatbotResponse,
  ChatbotsResponse,
  CreateChatbotDbInParams,
  CreateChatbotDbResponse,
} from '@/services/types/chatbot';
import { useToast } from '@/shared/hooks';
import useChatbotStore from '@/store/chatbot';
import useUserStore from '@/store/user';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useGetChatbots = () => {
  const { toast } = useToast();
  const { setChatbots } = useChatbotStore();
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation<ChatbotsResponse, APIErrorHandler, void>({
    mutationFn: () => chatbotApi.getAllChatbots(),
    onSuccess: (data) => {
      setChatbots(data.chatbots);
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
    getChatbots: mutate,
    loading,
    error,
  };
};

export const useGetChatbot = () => {
  const { toast } = useToast();
  const { setChatbot } = useChatbotStore();
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation<ChatbotResponse, APIErrorHandler, string>({
    mutationFn: (chatbotId) => chatbotApi.getChatbotById(chatbotId),
    onSuccess: (data) => {
      setChatbot(data.chatbot);
    },
    onError: (err) => {
      toast({
        title: 'Lấy chatbot thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    getChatbot: mutate,
    loading,
    error,
  };
};

export const useCreateChatbot = () => {
  const { toast } = useToast();
  const { apiToken, user } = useUserStore();
  const router = useRouter();
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation<
    CreateChatbotDbResponse,
    APIErrorHandler,
    CreateChatbotDbInParams
  >({
    mutationFn: async (data) => {
      const dbResponse = await chatbotApi.createChatbotDb({
        ...data,
        user_id: user?.id || '',
      });

      await chatbotApi.createChatbotCoze({
        ...data,
        chatbot_id: dbResponse.id,
        api_token: apiToken || '',
        user_id: user?.id || '',
      });
      return dbResponse;
    },
    onSuccess: (data) => {
      toast({
        title: 'Tạo chatbot thành công',
        description: data.message,
        variant: 'default',
      });
      router.push(`/dashboard/chatbot-training/${data.id}`);
    },
    onError: (err) => {
      toast({
        title: 'Tạo chatbot thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    createChatbot: mutate,
    loading,
    error,
  };
};

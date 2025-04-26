import { chatbotApi } from '@/services/endpoints';
import { APIErrorHandler } from '@/services/types';
import {
  ChatbotResponse,
  ChatbotsResponse,
  CreateChatbotInParams,
  CreateChatbotResponse,
} from '@/services/types/chatbot';
import { useToast } from '@/shared/hooks';
import useChatbotStore from '@/store/chatbot';
import { useMutation } from '@tanstack/react-query';

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

export const useGetChatbot = (chatbotId: string) => {
  const { toast } = useToast();
  const { setChatbot } = useChatbotStore();
  console.log(chatbotId);

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
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation<
    CreateChatbotResponse,
    APIErrorHandler,
    CreateChatbotInParams
  >({
    mutationFn: (data) => chatbotApi.createChatbot(data),
    onSuccess: (data) => {
      toast({
        title: 'Tạo chatbot thành công',
        description: data.message,
        variant: 'default',
      });
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

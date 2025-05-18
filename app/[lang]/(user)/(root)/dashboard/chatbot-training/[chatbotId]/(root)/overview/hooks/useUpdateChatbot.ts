'use client';

import { chatbotApi } from '@/services/endpoints';
import { APIErrorHandler } from '@/services/types';
import {
  PublishChatbotParams,
  PublishChatbotResponse,
  UpdateChatbotBasicParams,
  UpdateChatbotBasicResponse,
} from '@/services/types/chatbot';
import { useToast } from '@/shared/hooks';
import useChatbotStore from '@/store/chatbot';
import useUserStore from '@/store/user';
import { useMutation } from '@tanstack/react-query';
export const useUpdateChatbot = () => {
  const { toast } = useToast();
  const { user, apiToken } = useUserStore();
  const { chatbot } = useChatbotStore();
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation<
    UpdateChatbotBasicResponse,
    APIErrorHandler,
    UpdateChatbotBasicParams
  >({
    mutationFn: (params) =>
      chatbotApi.updateChatbotConfig({
        ...params,
        chatbot_id: chatbot?.id,
        user_id: user?.id,
        api_token: apiToken,
      }),
    onSuccess: (data) => {
      toast({
        title: 'Cập nhật chatbot thành công',
        description: data.message,
        variant: 'default',
      });
    },
    onError: (err) => {
      toast({
        title: 'Cập nhật chatbot thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });
  return {
    updateChatbot: mutate,
    loading,
    error,
  };
};

export const usePublishChatbot = () => {
  const { toast } = useToast();
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation<
    PublishChatbotResponse,
    APIErrorHandler,
    PublishChatbotParams
  >({
    mutationFn: (params) => chatbotApi.publishChatbot(params),
    onSuccess: () => {
      // toast({
      //   title: 'Tạo chatbot thành công',
      //   description: data.message,
      //   variant: 'default',
      // });
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
    publishChatbot: mutate,
    loading,
    error,
  };
};

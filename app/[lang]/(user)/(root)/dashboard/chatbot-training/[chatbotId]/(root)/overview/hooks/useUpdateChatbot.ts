'use client';

import { chatbotApi } from '@/services/endpoints';
import { APIErrorHandler } from '@/services/types';
import { PublishChatbotParams, PublishChatbotResponse, UpdateChatbotConfigParams } from '@/services/types/chatbot';
import { useToast } from '@/shared/hooks';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

interface UpdateChatbotResponse {
  success: boolean;
  message?: { message: string | string[] };
}

export const useUpdateChatbot = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<UpdateChatbotResponse | null>(null);
  const [success, setSuccess] = useState(false);

  const updateChatbot = async (
    chatbotId: string,
    data: UpdateChatbotConfigParams,
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`/api/chatbots/${chatbotId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: UpdateChatbotResponse = await response.json();

      if (!response.ok) {
        throw result;
      }

      setSuccess(true);
      return result;
    } catch (err) {
      setError(err as UpdateChatbotResponse);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateChatbot, loading, error, success };
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
    publishChatbot: mutate,
    loading,
    error,
  };
};

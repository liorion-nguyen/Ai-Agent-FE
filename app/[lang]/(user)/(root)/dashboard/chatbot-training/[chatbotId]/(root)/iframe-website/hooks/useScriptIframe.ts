import { chatbotApi } from '@/services/endpoints';
import { APIErrorHandler } from '@/services/types';
import {
  GetScriptIframeParams,
  GetScriptIframeResponse,
} from '@/services/types/chatbot';
import { useToast } from '@/shared/hooks';
import useChatbotStore from '@/store/chatbot';
import { useMutation } from '@tanstack/react-query';

export const useGetScriptIframe = () => {
  const { toast } = useToast();
  const { setScriptIframe } = useChatbotStore();
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation<
    GetScriptIframeResponse,
    APIErrorHandler,
    GetScriptIframeParams
  >({
    mutationFn: (params) => chatbotApi.getScriptIframe(params),
    onSuccess: (data) => {
      setScriptIframe(data);
    },
    onError: (err) => {
      toast({
        title: 'Lấy script iframe thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    getScriptIframe: mutate,
    loading,
    error,
  };
};

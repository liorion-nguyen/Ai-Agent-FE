import { messageApi } from '@/services/endpoints/message';
import { APIErrorHandler } from '@/services/types/error';
import {
  GetDialogBoxMessagesParams,
  GetDialogBoxMessagesResponse,
} from '@/services/types/message';
import { useToast } from '@/shared/hooks';
import { useMessageStore } from '@/store/message';
import { useMutation } from '@tanstack/react-query';

export const useGetDialogBoxMessages = () => {
  const { toast } = useToast();
  const { setDialogBoxMessages } = useMessageStore();
  const {
    mutateAsync,
    isPending: loading,
    error,
  } = useMutation<
    GetDialogBoxMessagesResponse,
    APIErrorHandler,
    GetDialogBoxMessagesParams
  >({
    mutationFn: (params: GetDialogBoxMessagesParams) =>
      messageApi.getDialogBoxMessages(params),
    onSuccess: (data) => {
      setDialogBoxMessages(data.data.messages);
    },
    onError: (err) => {
      toast({
        title: 'Lấy message dialog box thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    getDialogBoxMessages: mutateAsync,
    loading,
    error,
  };
};

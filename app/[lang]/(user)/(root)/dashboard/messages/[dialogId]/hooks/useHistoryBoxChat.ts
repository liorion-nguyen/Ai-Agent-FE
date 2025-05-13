import { GetDialogBoxMessagesParams } from '@/services/types/message';

import { APIErrorHandler } from '@/services/types/error';
import { GetDialogBoxMessagesResponse } from '@/services/types/message';
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
    mutationFn: () => {
      // (params) => messageApi.getDialogBoxMessages(params)
      return Promise.resolve({
        success: true,
        message: 'Success',
        data: [
          {
            id: '1',
            content: 'Content 1',
            createdAt: '2021-01-01 00:03:00',
            updatedAt: '2021-01-01 00:03:00',
            sender: 'user',
          },
          {
            id: '2',
            content: 'Content 2',
            createdAt: '2021-01-01 00:05:00',
            updatedAt: '2021-01-01 00:05:00',
            sender: 'bot',
          },
          {
            id: '3',
            content: 'Content 3',
            createdAt: '2021-01-01 00:07:00',
            updatedAt: '2021-01-01 00:07:00',
            sender: 'user',
          },
        ],
      });
    },
    onSuccess: (data) => {
      setDialogBoxMessages(data.data);
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

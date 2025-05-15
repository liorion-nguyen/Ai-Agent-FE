import { messageApi } from '@/services/endpoints/message';
import { APIErrorHandler } from '@/services/types';
import {
  GetDialogBoxsParams,
  GetDialogBoxsResponse,
} from '@/services/types/message';
import { useToast } from '@/shared/hooks';
import { useMessageStore } from '@/store/message';
import { useMutation } from '@tanstack/react-query';

export const useGetDialogBoxs = () => {
  const { toast } = useToast();
  const { setDialogBoxs } = useMessageStore();
  const {
    mutateAsync,
    isPending: loading,
    error,
  } = useMutation<GetDialogBoxsResponse, APIErrorHandler, GetDialogBoxsParams>({
    mutationFn: (params: GetDialogBoxsParams) =>
      messageApi.getDialogBoxs(params),
    onSuccess: (data) => {
      setDialogBoxs(data.data);
    },
    onError: (err) => {
      toast({
        title: 'Lấy dialog box thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    getDialogBoxs: mutateAsync,
    loading,
    error,
  };
};

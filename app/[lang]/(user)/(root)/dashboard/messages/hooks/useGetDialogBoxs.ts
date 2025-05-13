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
    mutationFn: () => {
      // (params) => messageApi.getDialogBoxs(params)
      return Promise.resolve({
        success: true,
        message: 'Success',
        data: [
          {
            id: '1',
            name: 'Dialog Box 1',
            description: 'Description 1',
            created_at: '2021-01-01',
            updated_at: '2021-01-01',
            thumbnail: '',
          },
          {
            id: '2',
            name: 'Dialog Box 2',
            description: 'Description 2',
            created_at: '2021-01-01',
            updated_at: '2021-01-01',
            thumbnail: '',
          },
        ],
      });
    },
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

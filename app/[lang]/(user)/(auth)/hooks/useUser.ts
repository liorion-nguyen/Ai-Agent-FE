import { useMutation } from '@tanstack/react-query';
import { authAPI } from '@/services/endpoints';
import { APIErrorHandler, GetMeResponse } from '@/services/types';
import { useToast } from '@/shared/hooks';
import useUserStore from '@/store/user';
export const useMe = () => {
  const { toast } = useToast();
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation<GetMeResponse, APIErrorHandler>({
    mutationFn: () => authAPI.me(),
    onSuccess: (data) => {
      useUserStore.setState({ user: data.user });
    },
    onError: (err) => {
      toast({
        title: 'Lấy thông tin người dùng thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    me: mutate,
    loading,
    error,
  };
};

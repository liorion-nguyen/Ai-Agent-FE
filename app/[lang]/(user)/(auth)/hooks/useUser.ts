import { authAPI } from '@/services/endpoints';
import { userApi } from '@/services/endpoints/user';
import { APIErrorHandler, GetMeResponse } from '@/services/types';
import { ApiTokenResponse } from '@/services/types/user';
import { useToast } from '@/shared/hooks';
import useUserStore from '@/store/user';
import { useMutation } from '@tanstack/react-query';
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

export const useSetApiToken = () => {
  const { toast } = useToast();
  const {
    mutateAsync,
    isPending: loading,
    error,
  } = useMutation<ApiTokenResponse, APIErrorHandler>({
    mutationFn: () => userApi.getApiToken(),
    onSuccess: (data) => {
      useUserStore.setState({ apiToken: data.token });
    },
    onError: (err) => {
      toast({
        title: 'Lấy token thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    setApiToken: mutateAsync,
    loading,
    error,
  };
};

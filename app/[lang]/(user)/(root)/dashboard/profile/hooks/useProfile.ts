import { userApi } from '@/services/endpoints/user';
import { APIErrorHandler, UpdateProfileInParams } from '@/services/types';
import { useToast } from '@/shared/hooks';
import { User } from '@/shared/types';
import useUserStore from '@/store/user';
import { useMutation } from '@tanstack/react-query';
export const useUpdateProfile = () => {
  const { toast } = useToast();
  const { setUser } = useUserStore();
  const {
    mutateAsync: updateProfile,
    isPending: loading,
    error,
  } = useMutation<User, APIErrorHandler, UpdateProfileInParams>({
    mutationFn: async (data) => {
      const dbResponse = await userApi.updateProfile(data);

      return dbResponse;
    },
    onSuccess: (data) => {
      toast({
        title: 'Cập nhật thông tin thành công',
        description: 'Cập nhật thông tin thành công',
        variant: 'default',
      });
      setUser(data);
    },
    onError: (err) => {
      toast({
        title: 'Cập nhật thông tin thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    updateProfile,
    loading,
    error,
  };
};

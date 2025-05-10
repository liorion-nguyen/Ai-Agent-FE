import { memberAPI } from '@/services/endpoints/member';
import { APIErrorHandler } from '@/services/types';
import {
  AddMemberParams,
  AddMemberResponse,
  GetMemberResTabel,
} from '@/services/types/member';
import { toast } from '@/shared/hooks';
import { TableQueryParams } from '@/shared/types/table';
import useMemberStore from '@/store/member';
import useUserStore from '@/store/user';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetMembers = (params?: TableQueryParams) => {
  const { user, workspace } = useUserStore();
  const { setMembers } = useMemberStore();
  const { data, isLoading, error, refetch, isFetching, isError } = useQuery<
    GetMemberResTabel,
    APIErrorHandler
  >({
    queryKey: ['members', params],
    queryFn: async () => {
      const res = await memberAPI.getMembers({
        ...params,
        user_id: user?.id || '',
        workspace_id: workspace?.id || '',
      });
      const response = {
        success: true,
        message: 'success',
        data: res.data.map((member) => ({
          fullname: member.user.fullname,
          email: member.user.email,
          username: member.user.username,
          role: member.role,
          created_at: member.created_at,
          isActive: true,
        })),
        totalCount: res.data.length,
      };
      setMembers(res.data);
      if (res.success) {
        return response;
      }
      throw res.data;
    },
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  };
};

export const useAddMember = () => {
  const {
    mutateAsync,
    isPending: loading,
    error,
  } = useMutation<AddMemberResponse, APIErrorHandler, AddMemberParams>({
    mutationFn: (member: AddMemberParams) => memberAPI.addMember(member),
    onSuccess: async (data) => {
      toast({
        title: 'Thêm thành viên thành công',
        description: data.message,
        variant: 'default',
      });
    },
    onError: (err) => {
      toast({
        title: 'Thêm thành viên thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    addMember: mutateAsync,
    loading,
    error,
  };
};

export const useUpdateMember = () => {
  const {
    mutateAsync,
    isPending: loading,
    error,
  } = useMutation<AddMemberResponse, APIErrorHandler, AddMemberParams>({
    mutationFn: (member: AddMemberParams) => memberAPI.updateMember(member),
    onSuccess: async (data) => {
      toast({
        title: 'Cập nhật thành viên thành công',
        description: data.message,
        variant: 'default',
      });
    },
    onError: (err) => {
      toast({
        title: 'Cập nhật thành viên thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    updateMember: mutateAsync,
    loading,
    error,
  };
};

export const useDeleteMember = () => {
  const {
    mutateAsync,
    isPending: loading,
    error,
  } = useMutation<AddMemberResponse, APIErrorHandler, AddMemberParams>({
    mutationFn: (member: AddMemberParams) => memberAPI.deleteMember(member),
    onSuccess: async (data) => {
      toast({
        title: 'Xóa thành viên thành công',
        description: data.message,
        variant: 'default',
      });
    },
    onError: (err) => {
      toast({
        title: 'Xóa thành viên thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    deleteMember: mutateAsync,
    loading,
    error,
  };
};

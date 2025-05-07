import { memberAPI } from '@/services/endpoints/member';
import { APIErrorHandler } from '@/services/types';
import {
  AddMemberParams,
  AddMemberResponse,
  GetMembersResponse,
} from '@/services/types/member';
import { toast } from '@/shared/hooks';
import useMemberStore from '@/store/member';
import { useMutation } from '@tanstack/react-query';

export const useGetMembers = () => {
  const { setMembers } = useMemberStore();
  const {
    mutateAsync,
    isPending: loading,
    error,
  } = useMutation<GetMembersResponse, APIErrorHandler>({
    mutationFn: () => memberAPI.getMembers(),
    onSuccess: (data) => {
      setMembers(data.data);
    },
    onError: (err) => {
      toast({
        title: 'Lấy danh sách thành viên thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    getMembers: mutateAsync,
    loading,
    error,
  };
};

export const useAddMember = () => {
  const { getMembers } = useGetMembers();
  const {
    mutateAsync,
    isPending: loading,
    error,
  } = useMutation<AddMemberResponse, APIErrorHandler, AddMemberParams>({
    mutationFn: (member: AddMemberParams) => memberAPI.addMember(member),
    onSuccess: (data) => {
      toast({
        title: 'Thêm thành viên thành công',
        description: data.message,
        variant: 'default',
      });
      getMembers();
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

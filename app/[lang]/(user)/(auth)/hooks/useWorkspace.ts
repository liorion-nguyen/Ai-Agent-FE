import { workspaceApi } from '@/services/endpoints/workspace';
import { APIErrorHandler } from '@/services/types';
import { WorkspaceResponse } from '@/services/types/workspace';
import { useToast } from '@/shared/hooks';
import useUserStore from '@/store/user';
import { useMutation } from '@tanstack/react-query';

export const useSetWorkspace = () => {
  const { toast } = useToast();
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation<WorkspaceResponse, APIErrorHandler, void>({
    mutationFn: () => workspaceApi.getWorkspaces(),
    onSuccess: (data) => {
      useUserStore.setState({ workspace: data.workspaces });
    },
    onError: (err) => {
      toast({
        title: 'Lấy workspace thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    setWorkspace: mutate,
    loading,
    error,
  };
};

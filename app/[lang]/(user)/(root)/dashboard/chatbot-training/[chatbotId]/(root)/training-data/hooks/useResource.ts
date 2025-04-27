import { resourceApi } from '@/services/endpoints';
import { APIErrorHandler } from '@/services/types';
import {
  CreateResourceParams,
  CreateResourceResponse,
  GetAllResourcesResponse,
  GetResourceResponse,
  UploadFileKnowledgeResponse,
} from '@/services/types/resource';
import { useToast } from '@/shared/hooks';
import useResourceStore from '@/store/resource';
import useUserStore from '@/store/user';
import { useMutation } from '@tanstack/react-query';

interface FileUploadParams {
  file: File;
  resource_id: string;
}

export const useGetResources = () => {
  const { toast } = useToast();
  const { setResources } = useResourceStore();
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation<GetAllResourcesResponse, APIErrorHandler, void>({
    mutationFn: () => resourceApi.getAllResources(),
    onSuccess: (data) => {
      setResources(data.resources.resources);
    },
    onError: (err) => {
      toast({
        title: 'Lấy danh sách chatbot thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    getAllResources: mutate,
    loading,
    error,
  };
};

export const useGetResource = () => {
  const { toast } = useToast();
  const { setResource } = useResourceStore();
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation<GetResourceResponse, APIErrorHandler, string>({
    mutationFn: (id) => resourceApi.getResourceById(id),
    onSuccess: (data) => {
      setResource(data.resource);
    },
    onError: (err) => {
      toast({
        title: 'Lấy tài nguyên thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    getResource: mutate,
    loading,
    error,
  };
};

export const useCreateResource = () => {
  const { toast } = useToast();
  const { user, apiToken, workspace } = useUserStore();
  const {
    mutateAsync,
    isPending: loading,
    error,
  } = useMutation<
    CreateResourceResponse,
    APIErrorHandler,
    CreateResourceParams
  >({
    mutationFn: (data) =>
      resourceApi.createResource({
        ...data,
        user_id: user?.id,
        api_token: apiToken,
        external_space_id: workspace?.external_space_id,
      }),
    onSuccess: (data) => {
      toast({
        title: 'Tạo tài nguyên thành công',
        description: data.message,
        variant: 'default',
      });
    },
    onError: (err) => {
      toast({
        title: 'Tạo tài nguyên thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    createResource: mutateAsync,
    loading,
    error,
  };
};

export const useUploadFile = () => {
  const { toast } = useToast();
  const { user, apiToken } = useUserStore();

  const {
    mutateAsync,
    isPending: loading,
    error,
  } = useMutation<
    UploadFileKnowledgeResponse,
    APIErrorHandler,
    FileUploadParams
  >({
    mutationFn: async (data) => {
      // Create FormData for encodeFile
      const formData = new FormData();
      formData.append('file', data.file);

      // Call encodeFile to get base64
      const encodeRes = await resourceApi.encodeFile({
        user_id: user?.id || '',
        file: formData,
        resource_id: data.resource_id,
      });

      // Call uploadFile with base64 data
      return await resourceApi.uploadFile({
        user_id: user?.id || '',
        resource_id: data.resource_id,
        api_token: apiToken || '',
        format_type: encodeRes.data.mimetype,
        filebase_64: encodeRes.data.base64,
        name_document: encodeRes.data.filename,
        file_type: encodeRes.data.mimetype.split('/')[1],
      });
    },
    onSuccess: (data) => {
      toast({
        title: 'Upload file thành công',
        description: data.message,
        variant: 'default',
      });
    },
    onError: (err) => {
      toast({
        title: 'Upload file thất bại',
        description: err?.message.message || 'An error occurred',
        variant: 'destructive',
      });
    },
  });

  return {
    uploadFile: mutateAsync,
    loading,
    error,
  };
};

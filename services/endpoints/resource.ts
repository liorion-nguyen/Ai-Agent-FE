import { GET, POST } from '@/services/api';
import { API_ENDPOINTS } from '@/shared/constants';
import {
  CreateResourceParams,
  CreateResourceResponse,
  EncodeFileParams,
  EncodeFileResponse,
  GetAllResourcesResponse,
  GetResourceResponse,
  UploadFileKnowledgeParams,
  UploadFileKnowledgeResponse,
} from '../types/resource';

export const resourceApi = {
  getAllResources: () =>
    GET<GetAllResourcesResponse>(API_ENDPOINTS.GET_ALL_RESOURCES),

  getResourceById: (id: string) =>
    GET<GetResourceResponse>(
      API_ENDPOINTS.GET_RESOURCE_BY_ID.replace(':id', id),
    ),

  createResource: (params: CreateResourceParams) =>
    POST<CreateResourceResponse>(
      API_ENDPOINTS.CREATE_RESOURCE.replace(':user_id', params.user_id || ''),
      params,
    ),

  uploadFile: (params: UploadFileKnowledgeParams) =>
    POST<UploadFileKnowledgeResponse>(
      API_ENDPOINTS.UPLOAD_FILE.replace(
        ':user_id',
        params.user_id || '',
      ).replace(':resource_id', params.resource_id || ''),
      params,
    ),

  encodeFile: (params: EncodeFileParams) =>
    POST<EncodeFileResponse>(
      API_ENDPOINTS.ENCODE_FILE.replace(':user_id', params.user_id || ''),
      params.file,
    ),
};

import { GET, PATCH, POST, POST_FORMDATA } from '@/services/api';
import { API_ENDPOINTS } from '@/shared/constants';
import {
  AddResourceToChatbotParams,
  AddResourceToChatbotResponse,
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
    POST_FORMDATA<EncodeFileResponse>(
      API_ENDPOINTS.ENCODE_FILE.replace(':user_id', params.user_id || ''),
      params.file,
    ),

  addResourceToChatbot: (params: AddResourceToChatbotParams) =>
    PATCH<AddResourceToChatbotResponse>(
      API_ENDPOINTS.ADD_RESOURCE_TO_CHATBOT.replace(
        ':user_id',
        params.user_id || '',
      ).replace(':chatbot_id', params.chatbot_id || ''),
      {
        api_token: params.api_token,
        dataset_ids: params.dataset_ids,
        auto_call: params.auto_call,
        search_strategy: params.search_strategy,
      },
    ),
};

import { GET, POST } from '@/services/api';
import { API_ENDPOINTS } from '@/shared/constants';
import {
  CreateResourceParams,
  GetAllResourcesResponse,
  GetResourceByIdResponse,
} from '../types/resource';

export const resourceApi = {
  getAllResources: () =>
    GET<GetAllResourcesResponse>(API_ENDPOINTS.GET_ALL_RESOURCES),

  getResourceById: (id: string) =>
    GET<GetResourceByIdResponse>(
      API_ENDPOINTS.GET_RESOURCE_BY_ID.replace(':id', id),
    ),

  createResource: (params: CreateResourceParams) =>
    POST(
      API_ENDPOINTS.CREATE_RESOURCE.replace(':user_id', params.user_id),
      params,
    ),
};

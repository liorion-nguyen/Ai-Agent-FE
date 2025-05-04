import { DELETE, GET, PATCH } from '@/services/api';
import {
  ApiTokenResponse,
  GetAllUsersResponse,
  GetUserByIdResponse,
} from '@/services/types/user';
import { API_ENDPOINTS } from '@/shared/constants';
import { User } from '@/shared/types';
export const userApi = {
  updateProfile: (params: Partial<User>) =>
    PATCH(API_ENDPOINTS.UPDATE_PROFILE, params),

  deleteUser: (id: string) =>
    DELETE(API_ENDPOINTS.DELETE_USER.replace(':id', id)),

  getApiToken: () => GET<ApiTokenResponse>(API_ENDPOINTS.API_TOKEN),

  getAllUsers: () => GET<GetAllUsersResponse>(API_ENDPOINTS.GET_ALL_USERS),

  getUserById: (id: string) =>
    GET<GetUserByIdResponse>(API_ENDPOINTS.GET_USER_BY_ID.replace(':id', id)),
};

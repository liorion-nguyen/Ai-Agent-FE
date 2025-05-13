import { DELETE, GET, PATCH, POST } from '@/services/api';
import {
  AddMemberParams,
  AddMemberResponse,
  GetMembersParams,
  GetMembersResponse,
} from '@/services/types/member';
import { API_ENDPOINTS } from '@/shared/constants';

export const memberAPI = {
  getMembers: (params: GetMembersParams) =>
    GET<GetMembersResponse>(
      API_ENDPOINTS.GET_MEMBERS.replace(
        ':workspace_id',
        params.workspace_id,
      ).replace(':user_id', params.user_id),
    ),

  addMember: (params: AddMemberParams) =>
    POST<AddMemberResponse>(
      API_ENDPOINTS.ADD_MEMBER.replace(':workspace_id', params.workspace_id),
      params,
    ),

  updateMember: (params: AddMemberParams) =>
    PATCH<AddMemberResponse>(
      API_ENDPOINTS.UPDATE_MEMBER.replace(':workspace_id', params.workspace_id),
      params,
    ),

  deleteMember: (params: AddMemberParams) =>
    DELETE<AddMemberResponse>(
      API_ENDPOINTS.DELETE_MEMBER.replace(
        ':workspace_id',
        params.workspace_id,
      ).replace(':user_id', params.user_id || ''),
    ),
};

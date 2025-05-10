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

  addMember: (member: AddMemberParams) =>
    POST<AddMemberResponse>(
      API_ENDPOINTS.ADD_MEMBER.replace(':workspace_id', member.workspace_id),
      {
        email: member.email,
        role: member.role,
      },
    ),

  updateMember: (member: AddMemberParams) =>
    PATCH<AddMemberResponse>(
      API_ENDPOINTS.UPDATE_MEMBER.replace(':workspace_id', member.workspace_id),
      {
        email: member.email,
        role: member.role,
      },
    ),

  deleteMember: (member: AddMemberParams) =>
    DELETE<AddMemberResponse>(
      API_ENDPOINTS.DELETE_MEMBER.replace(
        ':workspace_id',
        member.workspace_id,
      ).replace(':user_id', member.user_id || ''),
    ),
};

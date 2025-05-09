import { GET, POST } from '@/services/api';
import { API_ENDPOINTS } from '@/shared/constants';
import {
  AddMemberParams,
  AddMemberResponse,
  GetMembersParams,
  GetMembersResponse,
} from '../types/member';

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
};

import { GET, POST } from '@/services/api';
import { API_ENDPOINTS } from '@/shared/constants';
import {
  AddMemberParams,
  AddMemberResponse,
  GetMembersResponse,
} from '../types/member';

export const memberAPI = {
  getMembers: () => GET<GetMembersResponse>(API_ENDPOINTS.GET_MEMBERS),

  addMember: (member: AddMemberParams) =>
    POST<AddMemberResponse>(API_ENDPOINTS.ADD_MEMBER, member),
};

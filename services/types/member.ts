import { MemberRole } from '@/shared/constants/member';
import { Member, MemberList } from '@/shared/types';

export interface GetMembersResponse {
  success: boolean;
  message: string;
  data: Member[];
}

export interface GetMemberResTabel {
  success: boolean;
  message: string;
  data: MemberList[];
  totalCount: number;
}

export interface GetMembersParams {
  user_id: string;
  workspace_id: string;
}

export interface AddMemberResponse {
  success: boolean;
  message: string;
}

export interface AddMemberParams {
  email?: string;
  role?: MemberRole;
  workspace_id: string;
  user_id?: string;
}

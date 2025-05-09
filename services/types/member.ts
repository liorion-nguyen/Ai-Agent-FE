import { Member } from '@/shared/types/member';

export interface GetMembersResponse {
  success: boolean;
  message: string;
  data: Member[];
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
  email: string;
  role: string;
  workspace_id: string;
}

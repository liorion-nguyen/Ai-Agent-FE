import { Member } from '@/shared/types/member';

export interface GetMembersResponse {
  success: boolean;
  message: string;
  data: Member[];
}

export interface AddMemberResponse {
  success: boolean;
  message: string;
}

export interface AddMemberParams {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

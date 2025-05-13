import { MemberRole } from '@/shared/constants/member';

export interface Member {
  created_at: string;
  joined_at: string;
  role: MemberRole;
  updated_at: string;
  user: {
    email: string;
    fullname: string;
    id: string;
    username: string;
  };
  workspace: {
    id: string;
    workspace_name: string;
  };
}

export interface MemberList {
  fullname: string;
  email: string;
  username: string;
  role: MemberRole;
  created_at: string;
  isActive: boolean;
}

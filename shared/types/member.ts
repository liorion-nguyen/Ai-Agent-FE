export interface Member {
  created_at: string;
  joined_at: string;
  role: string;
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
  role: string;
  created_at: string;
  isActive: boolean;
}

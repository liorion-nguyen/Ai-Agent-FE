import { UserRole, UserStatus } from '@/shared/constants';
import { Chatbot } from './chatbot';
export interface User {
  id: string;
  username?: string;
  fullname?: string;
  thumbnail?: string | null;
  email: string;
  phone?: string | null;
  password?: string;
  status: UserStatus;
  created_at?: string;
  updated_at: string;
  customer_name?: string;
  domain?: string;
  role: UserRole;
  // customer?: Customer | null;
  chatbots: Chatbot[];
  api_token: {
    id: string;
    token: string;
    expires_at: string;
    created_at: string;
    updated_at: string;
  };
  workspace_id: string;
}

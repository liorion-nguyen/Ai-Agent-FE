import { TypeUser } from '@/shared/constants';

export interface SignInParams {
  email: string;
  password: string;
}

export interface SignInResponse {
  success: boolean;
  message: string;
  token: {
    access_token: string;
    refresh_token: string;
  };
}

export interface SignUpParams {
  name?: string;
  email: string;
  password: string;
  fullname?: string;
  type?: TypeUser;
  domain?: string;
  address?: string;
  business_name?: string;
  confirmPassword?: string;
  policy?: boolean;
}

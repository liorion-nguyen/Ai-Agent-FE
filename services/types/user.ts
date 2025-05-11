import { User } from '@/shared/types';

export interface ApiTokenResponse {
  success: boolean;
  message: string;
  token: string;
}

export interface ForgotPasswordParams {
  email: string;
}

export interface VerifyOtpParams {
  email: string;
  otp: string;
}

export interface NewPasswordParams {
  email: string;
  new_password: string;
  otp: string;
}

export interface GetAllUsersResponse {
  success: boolean;
  message: string;
  data: User[];
}

export interface GetUserByIdResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface UpdateProfileInParams {
  fullname?: string;
  phone?: string;
  email?: string;
  thumbnail?: string;
  password?: string;
}

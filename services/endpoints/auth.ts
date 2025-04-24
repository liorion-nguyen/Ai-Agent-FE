import { GET, POST, DELETE } from '@/services/api';
import { API_ENDPOINTS, TypeUser } from '@/shared/constants';
import { SignInParams, SignInResponse, SignUpParams } from '@/services/types';
import { ForgotPasswordParams } from '../types/user';
import { VerifyOtpParams } from '../types/user';
import { NewPasswordParams } from '../types/user';

export const authAPI = {
  signIn: (params: SignInParams) =>
    POST<SignInResponse>(API_ENDPOINTS.SIGNIN, params),

  signUp: (params: SignUpParams) =>
    POST<SignInResponse>(API_ENDPOINTS.SIGNUP, {
      ...params,
      type: TypeUser.PERSONAL,
    }),

  signOut: () => DELETE(API_ENDPOINTS.SIGNOUT),

  me: () => GET(API_ENDPOINTS.ME),

  postForgotPassword: (params: ForgotPasswordParams) =>
    POST(API_ENDPOINTS.FORGOT_PASSWORD, params),

  postVerifyOtp: (params: VerifyOtpParams) =>
    POST(API_ENDPOINTS.VERIFY_OTP, params),

  postNewPassword: (params: NewPasswordParams) =>
    POST(API_ENDPOINTS.RESET_PASSWORD, params),
};

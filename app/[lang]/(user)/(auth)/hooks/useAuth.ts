import { useMutation } from '@tanstack/react-query';
import { authAPI } from '@/services/endpoints';
import {
  APIErrorHandler,
  SignInParams,
  SignInResponse,
  SignUpParams,
} from '@/services/types';
import { toast, useToast } from '@/shared/hooks';
import { ROUTES } from '@/shared/constants';
import { useRouter } from 'next/navigation';
import {
  ForgotPasswordParams,
  VerifyOtpParams,
  NewPasswordParams,
} from '@/services/types/user';
import useForgotPasswordStore from '@/store/forgot-password';

export const useSignIn = () => {
  const { toast } = useToast();
  const router = useRouter();

  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation<SignInResponse, APIErrorHandler, SignInParams>({
    mutationFn: (params) => authAPI.signIn(params),
    onSuccess: (data) => {
      document.cookie = `access_token=${data.token.access_token}; path=/; max-age=${60 * 60 * 24 * 7}`;
      document.cookie = `refresh_token=${data.token.refresh_token}; path=/; max-age=${60 * 60 * 24 * 7}`;
      router.push(ROUTES.HOME);
    },
    onError: (err) => {
      toast({
        title: 'Đăng nhập thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    signIn: mutate,
    loading,
    error,
  };
};

export const useSignUp = () => {
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation<SignInResponse, Error, SignUpParams>({
    mutationFn: (params: SignUpParams) => authAPI.signUp(params),
    onSuccess: () => {
      toast({
        title: 'Đăng ký thành công',
        description: 'Đăng ký thành công',
        variant: 'default',
      });
      window.location.href = ROUTES.SIGNIN;
    },
    onError: (err) => {
      toast({
        title: 'Đăng ký thất bại',
        description: err?.message,
        variant: 'destructive',
      });
    },
  });
  return {
    signUp: mutate,
    loading,
    error,
  };
};

export const useSignOut = () => {
  const router = useRouter();
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation({
    mutationFn: () => authAPI.signOut(),
    onSuccess: () => {
      document.cookie = `access_token=; path=/; max-age=0`;
      document.cookie = `refresh_token=; path=/; max-age=0`;
      router.push(ROUTES.SIGNIN);
    },
    onError: (err) => {
      toast({
        title: 'Đăng xuất thất bại',
        description: err?.message,
        variant: 'destructive',
      });
    },
  });

  return {
    signOut: mutate,
    loading,
    error,
  };
};

export const useForgotPassword = () => {
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation({
    mutationFn: (params: ForgotPasswordParams) =>
      authAPI.postForgotPassword(params),
  });

  const forgotPassword = (params: ForgotPasswordParams) => {
    mutate(params, {
      onSuccess: () => {
        toast({
          title: 'Đặt lại mật khẩu thành công',
          description: 'Đặt lại mật khẩu thành công',
        });
        useForgotPasswordStore.setState({ step: 2 });
        useForgotPasswordStore.setState({ email: params.email });
      },
      onError: (err) => {
        toast({
          title: 'Đặt lại mật khẩu thất bại',
          description: err?.message,
        });
      },
    });
  };

  return {
    forgotPassword,
    loading,
    error,
  };
};

export const useVerifyOtp = () => {
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation({
    mutationFn: (params: VerifyOtpParams) => authAPI.postVerifyOtp(params),
    onSuccess: () => {
      toast({
        title: 'Xác thực OTP thành công',
        description: 'Xác thực OTP thành công',
      });
      useForgotPasswordStore.setState({ step: 3 });
    },
    onError: (err) => {
      toast({
        title: 'Xác thực OTP thất bại',
        description: err?.message,
      });
    },
  });

  return {
    verifyOtp: mutate,
    loading,
    error,
  };
};

export const useResetPassword = () => {
  const router = useRouter();
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation({
    mutationFn: (params: NewPasswordParams) => authAPI.postNewPassword(params),
    onSuccess: () => {
      toast({
        title: 'Đặt lại mật khẩu thành công',
        description: 'Đặt lại mật khẩu thành công',
      });
      router.push(ROUTES.SIGNIN);
    },
    onError: (err) => {
      toast({
        title: 'Đặt lại mật khẩu thất bại',
        description: err?.message,
      });
    },
  });

  return {
    resetPassword: mutate,
    loading,
    error,
  };
};

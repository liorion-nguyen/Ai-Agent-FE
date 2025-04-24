import { useMutation } from '@tanstack/react-query';
import { authAPI } from '@/services/endpoints';
import {
  APIErrorHandler,
  SignInParams,
  SignInResponse,
  SignUpParams,
} from '@/services/types';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/constants';

export const useSignIn = () => {
  const router = useRouter();
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation<SignInResponse, APIErrorHandler, SignInParams>({
    mutationFn: (params) => authAPI.signIn(params),
    onSuccess: (data) => {
      document.cookie = `access_token=${data.token.access_token} path=/; max-age=${60 * 60 * 24 * 7}`;
      document.cookie = `refresh_token=${data.token.refresh_token} path=/; max-age=${60 * 60 * 24 * 7}`;
      router.push(ROUTES.HOME);
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
  });

  return {
    signOut: mutate,
    loading,
    error,
  };
};

import { AxiosInstance, AxiosResponse } from 'axios';
import { APIErrorHandler } from '@/services/types';
import { ACCESS_TOKEN, HTTP_CODE } from '@/shared/constants';

function getTokenFromCookie(name: string) {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find((c) => c.startsWith(name + '='));
  return cookie ? cookie.split('=')[1] : null;
}

export const setupInterceptors = (axiosInstance: AxiosInstance): void => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getTokenFromCookie(ACCESS_TOKEN);

      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === HTTP_CODE.UNAUTHORIZED &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          // const newToken = await refreshToken();
          // if (newToken) {
          //   axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
          //   if (originalRequest.headers) {
          //     originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          //   }
          //   return axiosInstance(originalRequest);
          // }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          window.location.href = '/sign-in';
        }
      }

      const errorData = error.response?.data as APIErrorHandler;
      return Promise.reject(
        new APIErrorHandler(
          errorData.statusCode,
          errorData.message,
          errorData.path,
          errorData.timestamp,
        ),
      );
    },
  );
};

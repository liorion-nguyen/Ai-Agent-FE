import { APIErrorHandler } from '@/services/types';
import { ACCESS_TOKEN, HTTP_CODE, REFRESH_TOKEN } from '@/shared/constants';
import { getTokenFromCookie } from '@/shared/utils/cookie';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

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
        !originalRequest._retry &&
        !originalRequest.url?.includes('/refresh-token')
      ) {
        originalRequest._retry = true;

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
            {
              refreshToken: getTokenFromCookie(REFRESH_TOKEN),
            },
          );

          const newToken = response.data.access_token;
          if (originalRequest.headers) {
            document.cookie = `access_token=${newToken}; path=/; max-age=${60 * 60 * 24 * 7}`;
          }
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          document.cookie = `access_token=; path=/; max-age=0`;
          document.cookie = `refresh_token=; path=/; max-age=0`;
          // window.location.href = '/vi/s';
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

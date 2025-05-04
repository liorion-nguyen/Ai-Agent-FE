import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiClient } from './client';

export const GET = async <T = unknown, P = Record<string, unknown>>(
  url: string,
  params?: P,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.get(url, {
    params,
    ...config,
  });
  return response.data;
};

export const POST = async <T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.post(url, data, config);
  return response.data;
};

export const PUT = async <T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.put(url, data, config);
  return response.data;
};

export const PATCH = async <T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.patch(url, data, config);
  return response.data;
};

export const DELETE = async <T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.delete(url, config);
  return response.data;
};

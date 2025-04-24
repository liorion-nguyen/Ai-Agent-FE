import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { setupInterceptors } from './interceptors';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

const createApiClient = (config?: AxiosRequestConfig): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...config?.headers,
    },
    ...config,
  });

  setupInterceptors(axiosInstance);

  return axiosInstance;
};

const apiClient = createApiClient();

export { apiClient, createApiClient };

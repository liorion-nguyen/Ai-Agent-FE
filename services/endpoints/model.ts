import { API_ENDPOINTS } from '@/shared/constants';
import { GET } from '../api';
import { ModelResponse } from '../types/model';

export const modelApi = {
  getModels: () => GET<ModelResponse[]>(API_ENDPOINTS.GET_MODELS),
};

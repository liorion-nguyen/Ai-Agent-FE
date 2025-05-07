import { GET } from '@/services/api';
import { ModelResponse } from '@/services/types/model';
import { API_ENDPOINTS } from '@/shared/constants';

export const modelApi = {
  getModels: () => GET<ModelResponse[]>(API_ENDPOINTS.GET_MODELS),
};

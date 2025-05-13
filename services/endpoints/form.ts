import { GET } from '@/services/api';
import { API_ENDPOINTS } from '@/shared/constants';
import { TableQueryParams } from '@/shared/types/table';
import { GetFormsResponse } from '../types/form';

export const formAPI = {
  getForms: (params: TableQueryParams) =>
    GET<GetFormsResponse>(API_ENDPOINTS.GET_FORMS, params),
};

import { GET } from '@/services/api';
import { API_ENDPOINTS } from '@/shared/constants';
import { WorkspaceResponse } from '../types/workspace';

export const workspaceApi = {
  getWorkspace: () => GET<WorkspaceResponse>(API_ENDPOINTS.GET_WORKSPACE),
};

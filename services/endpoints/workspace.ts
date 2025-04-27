import { GET } from '@/services/api';
import { API_ENDPOINTS } from '@/shared/constants';
import { WorkspaceResponse } from '../types/workspace';

export const workspaceApi = {
  getWorkspaces: () => GET<WorkspaceResponse>(API_ENDPOINTS.GET_WORKSPACE),
};

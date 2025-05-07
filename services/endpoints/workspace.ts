import { GET } from '@/services/api';
import { WorkspaceResponse } from '@/services/types/workspace';
import { API_ENDPOINTS } from '@/shared/constants';

export const workspaceApi = {
  getWorkspaces: () => GET<WorkspaceResponse>(API_ENDPOINTS.GET_WORKSPACE),
};

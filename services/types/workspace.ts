import { Workspace } from '@/shared/types/workspace';

export interface WorkspaceResponse {
  success: boolean;
  message: string;
  data: Workspace[];
}

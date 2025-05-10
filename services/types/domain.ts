import { DomainList } from '@/shared/types';

export interface GetDomainsResponse {
  success: boolean;
  message: string;
  data: DomainList[];
  totalCount: number;
  totalPages?: number;
}

export interface GetDomainsParams {
  workspace_id: string;
  user_id: string;
}

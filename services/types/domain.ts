import { Domain, DomainList } from '@/shared/types/domain';

export interface GetDomainsResponse {
  success: boolean;
  message: string;
  domains: Domain[];
  totalCount: number;
  totalPages?: number;
}
export interface GetDomainResTabel {
  success: boolean;
  message: string;
  data: DomainList[];
  totalCount: number;
}
export interface AddDomainResponse {
  success: boolean;
  message: string;
}

export interface AddDomainParams {
  domain: string;
  description?: string;
}

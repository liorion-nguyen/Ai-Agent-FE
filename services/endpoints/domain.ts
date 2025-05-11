import { GET, POST } from '@/services/api';
import { AddDomainParams, GetDomainsResponse } from '@/services/types/domain';
import { API_ENDPOINTS } from '@/shared/constants';
import { Domain } from '@/shared/types';

export const domainAPI = {
  getDomains: () => GET<GetDomainsResponse>(API_ENDPOINTS.GET_DOMAINS),

  addDomain: (domain: AddDomainParams) =>
    POST<Domain>(API_ENDPOINTS.ADD_DOMAIN, {
      domain: domain.domain,
      description: domain.description,
    }),

  verifyDomain: (domainId: string) =>
    POST<string>(API_ENDPOINTS.VERIFY_DOMAIN.replace(':domain_id', domainId)),

  //   updateDomain: (domain: AddDomainParams) =>
  //     PATCH<AddDomainResponse>(
  //       API_ENDPOINTS.UPDATE_DOMAIN.replace(':workspace_id', domain.workspace_id),
  //       {
  //         domain: domain.domain,
  //         status: domain.status,
  //         description: domain.description,
  //       },
  //     ),

  //   deleteDomain: (domain: AddDomainParams) =>
  //     DELETE<AddDomainResponse>(
  //       API_ENDPOINTS.DELETE_DOMAIN.replace(
  //         ':workspace_id',
  //         domain.workspace_id,
  //       ).replace(':user_id', domain.user_id || ''),
  //     ),
};

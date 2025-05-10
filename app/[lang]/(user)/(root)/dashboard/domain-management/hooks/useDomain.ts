import { APIErrorHandler, GetDomainsResponse } from '@/services/types';
import { DomainStatus } from '@/shared/constants';
import { TableQueryParams } from '@/shared/types/table';
import { useQuery } from '@tanstack/react-query';
export const useGetDomain = (params?: TableQueryParams) => {
  const { data, isLoading, error, refetch, isFetching, isError } = useQuery<
    GetDomainsResponse,
    APIErrorHandler
  >({
    queryKey: ['permissions', params],
    queryFn: async () => {
      // const res = await formAPI.getForms(params!);
      // if (res.success) {
      //     return res;
      // }
      const res: GetDomainsResponse = {
        success: true,
        message: 'success',
        data: [
          {
            id: '1',
            domain: 'example.com',
            status: DomainStatus.ACTIVE,
            description: 'Mô tả',
            created_at: '2021-01-01',
          },
          {
            id: '2',
            domain: 'example.com',
            status: DomainStatus.ACTIVE,
            description: 'Mô tả',
            created_at: '2021-01-01',
          },
        ],
        totalCount: 10,
      };
      if (res.success) {
        return res;
      }
      throw res.data;
    },
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  };
};

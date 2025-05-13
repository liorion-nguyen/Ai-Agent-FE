import { APIErrorHandler } from '@/services/types';
import { GetPaymentsResponse } from '@/services/types/payment';
import { TableQueryParams } from '@/shared/types/table';
import { useQuery } from '@tanstack/react-query';
export const useGetPayments = (params?: TableQueryParams) => {
  const { data, isLoading, error, refetch, isFetching, isError } = useQuery<
    GetPaymentsResponse,
    APIErrorHandler
  >({
    queryKey: ['permissions', params],
    queryFn: async () => {
      // const res = await formAPI.getForms(params!);
      // if (res.success) {
      //     return res;
      // }
      const res: GetPaymentsResponse = {
        success: true,
        message: 'success',
        data: [
          {
            id: '1',
            amount: 100000,
            payment_method: 'bank_transfer',
            status: 'success',
            created_at: '2021-01-01',
          },
          {
            id: '2',
            amount: 200000,
            payment_method: 'bank_transfer',
            status: 'success',
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

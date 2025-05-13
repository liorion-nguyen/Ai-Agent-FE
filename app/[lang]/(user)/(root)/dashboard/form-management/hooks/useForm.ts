import { APIErrorHandler } from '@/services/types';
import { GetFormsResponse } from '@/services/types/form';
import { TableQueryParams } from '@/shared/types/table';
import { useQuery } from '@tanstack/react-query';
export const useGetForms = (params?: TableQueryParams) => {
  const { data, isLoading, error, refetch, isFetching, isError } = useQuery<
    GetFormsResponse,
    APIErrorHandler
  >({
    queryKey: ['permissions', params],
    queryFn: async () => {
      // const res = await formAPI.getForms(params!);
      // if (res.success) {
      //     return res;
      // }
      const res: GetFormsResponse = {
        success: true,
        message: 'success',
        data: [
          {
            id: '1',
            name: 'Form 1',
            type: 'form',
            created_at: '2021-01-01',
            status: 'active',
          },
          {
            id: '2',
            name: 'Form 2',
            type: 'form',
            created_at: '2021-01-01',
            status: 'active',
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

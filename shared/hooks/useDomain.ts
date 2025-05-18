import { domainAPI } from '@/services/endpoints/domain';
import {
  APIErrorHandler,
  GetDomainResTabel,
  GetDomainsResponse,
} from '@/services/types';
import { useToast } from '@/shared/hooks';
import { TableQueryParams } from '@/shared/types/table';
import useDomainStore from '@/store/domain';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
export const useGetDomain = (params?: TableQueryParams) => {
  const { setDomains } = useDomainStore();
  const { data, isLoading, error, refetch, isFetching, isError } = useQuery<
    GetDomainResTabel,
    APIErrorHandler
  >({
    queryKey: ['permissions', params],
    queryFn: async () => {
      const res = await domainAPI.getDomains();
      const response = {
        success: true,
        message: 'success',
        data: res.domains.map((domain) => ({
          id: domain.id,
          name: domain.name,
          isVerified: domain.isVerified,
          verificationToken: domain.verificationToken,
          status: domain.status,
          created_at: domain.created_at,
          updated_at: domain.updated_at,
        })),
        totalCount: res.domains.length,
      };
      setDomains(response.data);
      if (res.success) {
        return response;
      }
      throw res.domains;
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

export const useGetSelectDomain = () => {
  const { setDomains } = useDomainStore();
  const { toast } = useToast();
  const router = useRouter();
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation<GetDomainsResponse, APIErrorHandler>({
    mutationFn: () => domainAPI.getDomains(),
    onSuccess: (data) => {
      setDomains(data.domains);
    },
    onError: (err) => {
      setDomains([]);
      toast({
        title: 'Lấy domain thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
      router.push('/dashboard/domain-management');
    },
  });

  return {
    getDomain: mutate,
    loading,
    error,
  };
};

export const useVerifyDomain = () => {
  const { toast } = useToast();
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation<string, APIErrorHandler, string>({
    mutationFn: (id) => domainAPI.verifyDomain(id),
    onSuccess: () => {
      toast({
        title: 'Xác nhận domain thành công',
        variant: 'default',
      });
    },
    onError: (err) => {
      toast({
        title: 'Xác nhận domain thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    verifyDomain: mutate,
    loading,
    error,
  };
};

import { domainAPI } from '@/services/endpoints/domain';
import { AddDomainParams, APIErrorHandler } from '@/services/types';
import { toast } from '@/shared/hooks';
import { Domain } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';
export const useAddDomain = () => {
  const {
    mutateAsync,
    isPending: loading,
    error,
  } = useMutation<Domain, APIErrorHandler, AddDomainParams>({
    mutationFn: (domain: AddDomainParams) => domainAPI.addDomain(domain),
    onSuccess: async (data) => {
      toast({
        title: 'Thêm domain thành công',
        variant: 'default',
      });
      await domainAPI.verifyDomain(data.id);
    },
    onError: (err) => {
      toast({
        title: 'Thêm domain thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    addDomain: mutateAsync,
    loading,
    error,
  };
};

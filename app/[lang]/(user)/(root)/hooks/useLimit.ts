import { subscriptionApi } from '@/services/endpoints';
import {
  RemainingLimitsRequest,
  RemainingLimitsResponse,
} from '@/services/types';
import { APIErrorHandler } from '@/services/types/error';
import { toast } from '@/shared/hooks/useToast';
import useSubscriptionStore from '@/store/subscription';
import { useMutation } from '@tanstack/react-query';
export const useLimit = () => {
  const { setRemainingLimits } = useSubscriptionStore();
  const {
    mutateAsync: getRemainingLimits,
    isPending: loading,
    error,
  } = useMutation<
    RemainingLimitsResponse,
    APIErrorHandler,
    RemainingLimitsRequest
  >({
    mutationFn: (data) => subscriptionApi.getRemainingLimits(data),
    onSuccess: (data) => {
      setRemainingLimits(data.remainingLimits);
    },
    onError: (err) => {
      toast({
        title: 'Mua gói thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    getRemainingLimits,
    loading,
    error,
  };
};

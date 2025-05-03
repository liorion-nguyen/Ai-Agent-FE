import { subscriptionApi } from '@/services/endpoints/subscription';
import { APIErrorHandler } from '@/services/types';
import { SubscriptionResponse } from '@/services/types/subscription';
import { useToast } from '@/shared/hooks';
import { Subscription } from '@/shared/types/subscription';
import useSubscriptionStore from '@/store/subscription';
import { useMutation } from '@tanstack/react-query';

export const useSubscriptions = () => {
  const { toast } = useToast();
  const { setSubscriptions } = useSubscriptionStore();
  const {
    mutateAsync: getSubscriptions,
    isPending: loading,
    error,
  } = useMutation<Subscription[], APIErrorHandler, void>({
    mutationFn: () => subscriptionApi.getSubscriptions(),
    onSuccess: (data) => {
      setSubscriptions(data);
    },
    onError: (err) => {
      toast({
        title: 'Lấy danh sách gói thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    getSubscriptions,
    loading,
    error,
  };
};

export const useSubscription = () => {
  const { toast } = useToast();
  const { subscriptions } = useSubscriptionStore();
  const {
    mutateAsync: getSubscription,
    isPending: loading,
    error,
  } = useMutation<SubscriptionResponse, APIErrorHandler, void>({
    mutationFn: () => subscriptionApi.getSubscription(),
    onSuccess: (data) => {
      console.log(data, subscriptions);
      //   setSubscription(subscriptions.find((subscription) => subscription.id === data.userSubscription.id));
    },
    onError: (err) => {
      toast({
        title: 'Lấy gói thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    getSubscription,
    loading,
    error,
  };
};

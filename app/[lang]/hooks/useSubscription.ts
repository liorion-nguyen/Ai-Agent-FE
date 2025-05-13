import { subscriptionApi } from '@/services/endpoints/subscription';
import { APIErrorHandler } from '@/services/types';
import {
  CommonBasicRequest,
  CommonBasicResponse,
  SubscriptionResponse,
} from '@/services/types/subscription';
import { toast } from '@/shared/hooks';
import { Subscription } from '@/shared/types/subscription';
import useSubscriptionStore from '@/store/subscription';
import useUserStore from '@/store/user';
import { useMutation } from '@tanstack/react-query';

export const useSubscriptions = () => {
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
  const { setSubscription, subscriptions } = useSubscriptionStore();
  // const { subscribeSubscription } = useSubscribeSubscription();
  const { user } = useUserStore();
  const {
    mutateAsync: getSubscription,
    isPending: loading,
    error,
  } = useMutation<SubscriptionResponse, APIErrorHandler, void>({
    mutationFn: () => subscriptionApi.getSubscription(),
    onSuccess: (data) => {
      setSubscription(data.userSubscription);
    },
    onError: (e) => {
      // toast({
      //   title: 'Lấy gói thất bại',
      //   description: err?.message.message,
      //   variant: 'destructive',
      // });
      if (e.statusCode === 404) {
        const subscriptionId = subscriptions.find(
          (subscription) => subscription.price == 0,
        )?.id;
        if (subscriptionId) {
          // subscribeSubscription({
          //   subscriptionId,
          //   userId: user?.id || '',
          // });
          subscriptionApi.subscribeSubscription({
            subscriptionId,
            userId: user?.id || '',
          });
        }
      }
    },
  });

  return {
    getSubscription,
    loading,
    error,
  };
};

export const useGetSubscriptionById = () => {
  const {
    mutateAsync: getSubscriptionById,
    isPending: loading,
    error,
  } = useMutation<Subscription, APIErrorHandler, string>({
    mutationFn: (id) => subscriptionApi.getSubscriptionById(id),
    onSuccess: (data) => {
      return data;
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
    getSubscriptionById,
    loading,
    error,
  };
};
export const useSubscribeSubscription = () => {
  const { getSubscription } = useSubscription();
  const {
    mutateAsync: subscribeSubscription,
    isPending: loading,
    error,
  } = useMutation<CommonBasicResponse, APIErrorHandler, CommonBasicRequest>({
    mutationFn: (data) => subscriptionApi.subscribeSubscription(data),
    onSuccess: (data) => {
      toast({
        title: 'Mua gói thành công',
        description: data.message,
      });
      getSubscription();
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
    subscribeSubscription,
    loading,
    error,
  };
};

export const useCancelSubscription = () => {
  const {
    mutateAsync: cancelSubscription,
    isPending: loading,
    error,
  } = useMutation<CommonBasicResponse, APIErrorHandler, CommonBasicRequest>({
    mutationFn: (data) => subscriptionApi.cancelSubscription(data),
    onSuccess: (data) => {
      toast({
        title: 'Hủy gói thành công',
        description: data.message,
      });
    },
    onError: (err) => {
      toast({
        title: 'Hủy gói thất bại',
        description: err?.message.message,
        variant: 'destructive',
      });
    },
  });

  return {
    cancelSubscription,
    loading,
    error,
  };
};

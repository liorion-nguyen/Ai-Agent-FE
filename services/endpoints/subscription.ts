import { GET, POST } from '@/services/api';
import {
  CommonBasicRequest,
  CommonBasicResponse,
  SubscriptionResponse,
} from '@/services/types/subscription';
import { API_ENDPOINTS } from '@/shared/constants';
import { Subscription } from '@/shared/types/subscription';

export const subscriptionApi = {
  getSubscriptions: () => GET<Subscription[]>(API_ENDPOINTS.GET_SUBSCRIPTIONS),
  getSubscription: () =>
    GET<SubscriptionResponse>(API_ENDPOINTS.GET_SUBSCRIPTION),
  getSubscriptionById: (id: string) =>
    GET<Subscription>(API_ENDPOINTS.GET_SUBSCRIPTION_BY_ID.replace(':id', id)),
  subscribeSubscription: (data: CommonBasicRequest) =>
    POST<CommonBasicResponse>(API_ENDPOINTS.SUBSCRIBE_SUBSCRIPTION, data),
  cancelSubscription: (data: CommonBasicRequest) =>
    POST<CommonBasicResponse>(API_ENDPOINTS.CANCEL_SUBSCRIPTION, data),
  upgradeSubscription: (data: CommonBasicRequest) =>
    POST<CommonBasicResponse>(API_ENDPOINTS.UPGRADE_SUBSCRIPTION, data),
  renewSubscription: (data: CommonBasicRequest) =>
    POST<CommonBasicResponse>(API_ENDPOINTS.RENEW_SUBSCRIPTION, data),
};

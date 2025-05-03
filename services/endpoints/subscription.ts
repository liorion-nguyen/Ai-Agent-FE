import { SubscriptionResponse } from '@/services/types/subscription';
import { API_ENDPOINTS } from '@/shared/constants';
import { Subscription } from '@/shared/types/subscription';
import { GET } from '../api';

export const subscriptionApi = {
  getSubscriptions: () => GET<Subscription[]>(API_ENDPOINTS.GET_SUBSCRIPTIONS),
  getSubscription: () =>
    GET<SubscriptionResponse>(API_ENDPOINTS.GET_SUBSCRIPTION),
};

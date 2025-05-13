import { RemainingLimits } from '@/shared/types/subscription';

export interface SubscriptionResponse {
  success: boolean;
  message: string;
  userSubscription: {
    id: string;
    subscription: {
      name: string;
      message_limit: number;
      knowledge_limit: number;
      member_limit: number;
      agent_limit: number;
      duration_months: number;
    };
    status: string;
  };
}
export interface CommonBasicResponse {
  success: boolean;
  message: string;
}

export interface CommonBasicRequest {
  subscriptionId: string;
  userId: string;
}

export interface RemainingLimitsResponse {
  success: boolean;
  message: string;
  remainingLimits: RemainingLimits;
}

export interface RemainingLimitsRequest {
  startDate: string;
  endDate: string;
}

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

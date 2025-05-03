export interface SubscriptionResponse {
  success: boolean;
  message: string;
  userSubscription: {
    id: string;
    subscription: {
      message_limit: number;
      knowledge_limit: number;
      member_limit: number;
      agent_limit: number;
    };
    status: string;
  };
}

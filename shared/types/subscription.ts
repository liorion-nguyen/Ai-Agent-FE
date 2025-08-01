export interface Subscription {
  id: string;
  name: string;
  message_limit: number;
  knowledge_limit: number;
  member_limit: number;
  agent_limit: number;
  is_custom: boolean;
  price: number;
  duration_months: number;
  created_at: string;
  updated_at: string;
  subscription_features: SubscriptionFeature[];
}

export interface SubscriptionFeature {
  id: string;
  feature: {
    id: string;
    name: string;
    description: string;
  };
}

export interface UserSubscription {
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
}

export interface RemainingLimits {
  message: number;
  knowledge: number;
  agent: number;
  member: number;
}

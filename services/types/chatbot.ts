import { Chatbot, ChatbotToken } from '@/shared/types/chatbot';

export interface ChatbotsResponse {
  success: boolean;
  message: string;
  chatbots: Chatbot[];
}

export interface ChatbotResponse {
  success: boolean;
  message: string;
  chatbot: Chatbot;
}

export interface CreateChatbotDbInParams {
  chatbot_name: string;
  thumbnail?: string;
  prompt_info?: string;
  description?: string;
  chatbot_id?: string;
  user_id?: string;
}

export interface CreateChatbotDbResponse {
  success: boolean;
  message: string;
  chatbot_name: string;
  connector_id: string;
  created_at: string;
  description: string;
  external_bot_id: string | null;
  icon_url: string | null;
  id: string;
  model: {
    id: string;
    model_name: string;
    description: string;
    icon_url: string;
    context_length: string | null;
  };
  prompt_info: string | null;
  status: string;
  updated_at: string;
}

export interface CreateChatbotCozeInParams {
  chatbot_id: string;
  chatbot_name: string;
  thumbnail?: string;
  prompt_info?: string;
  description?: string;
  user_id?: string;
  api_token: string;
}

export interface CreateChatbotCozeResponse {
  success: boolean;
  message: string;
  chatbot: Chatbot;
}

export interface PublishChatbotParams {
  user_id: string;
  connector_id: string;
  api_token: string;
  chatbot_id: string;
}

export interface PublishChatbotResponse {
  success: boolean;
  message: string;
}

export interface UpdateChatbotBasicParams {
  user_id?: string;
  chatbot_id?: string;
  api_token?: string;
  chatbot_name?: string;
  description?: string;
  businessName?: string;
  language?: string;
  theme?: string;
}

export interface UpdateChatbotBasicResponse {
  message: string;
  statusCode: number;
}
export interface UpdateChatbotPromptParams {
  user_id: string;
  chatbot_id: string;
  api_token: string;
  prompt_info: string;
}

export interface UpdateChatbotDocumentsParams {
  user_id: string;
  chatbot_id: string;
  api_token: string;
  knowledge: {
    dataset_ids: string[];
    auto_call: boolean;
    search_strategy: number;
  };
}

export interface UpdateChatbotOnboardingParams {
  user_id: string;
  chatbot_id: string;
  api_token: string;
  onboarding_info: {
    prologue: string;
    suggested_questions: {
      position: number;
      question: string;
    }[];
  };
}

export interface CreateChatbotOnboardingParams {
  user_id: string;
  chatbot_id: string;
  api_token: string;
  onboarding_info: {
    prologue: string;
    suggested_questions: {
      position: number;
      question: string;
    }[];
  };
}

export interface CreateChatbotPromptParams {
  user_id: string;
  prompt_name: string;
  prompt_info: string;
  description: string;
  api_token: string;
}

export interface SendMessageParams {
  user_id: string;
  chatbot_id: string;
  message: string;
  api_token: string;
}

export interface ChatbotTokenResponse {
  success: boolean;
  message: string;
  chatbotTokens: ChatbotToken[];
}

export interface CreateChatbotTokenParams {
  token: string;
}

export interface GetScriptIframeResponse {
  token: string;
  userId: string;
  chatbotId: string;
}

export interface GetScriptIframeParams {
  domainId: string;
  chatbotId: string;
}

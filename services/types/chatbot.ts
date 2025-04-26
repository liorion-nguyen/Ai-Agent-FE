import { Chatbot } from '@/shared/types/chatbot';

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

export interface CreateChatbotInParams {
  chatbot_name: string;
  thumbnail?: string;
  prompt_info?: string;
  description?: string;
  user_id: string;
  chatbot_id?: string;
}

export interface CreateChatbotResponse {
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

export interface UpdateChatbotConfigParams {
  user_id: string;
  chatbot_id: string;
  api_token: string;
  model_info_config: {
    model_id: string;
    model_name: string;
  };
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

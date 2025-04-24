import { ChatbotStatus } from '../constants/chatbot';
import { Model } from './model';
import { Resource } from './resource';
import { User } from './user';

export interface Chatbot {
  id: string;
  chatbot_name: string;
  connector_id: string;
  thumbnail?: string;
  prompt_info?: string;
  description?: string;
  status: ChatbotStatus;
  created_at?: string;
  updated_at?: string;
  user: User;
  chatbot_onboarding: ChatbotOnboarding;
  external_bot_id?: string | null;
  icon_url?: string;
  model_id: string;
  api_token?: string;
  model: Model;
  onboarding: ChatbotOnboarding;
  chatbot_resources: ChatbotResource[];
}

export interface ChatbotOnboarding {
  id: string;
  description: string;
  prologue: string;
  created_at: Date;
  updated_at: Date;
  chatbot: Chatbot;
  suggested_questions: {
    position: number;
    question: string;
  }[];
}

export interface ChatbotResource {
  id: string;
  resource: Resource;
  created_at: Date;
}

export interface ChatbotPrompt {
  id: string;
  prompt_name: string;
  prompt_info: string;
  description: string;
}

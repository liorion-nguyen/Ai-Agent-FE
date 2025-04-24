import { GET, PATCH, POST } from '@/services/api';
import { API_ENDPOINTS } from '@/shared/constants';
import { Chatbot } from '@/shared/types/chatbot';
import {
  CreateChatbotInParams,
  CreateChatbotOnboardingParams,
  CreateChatbotPromptParams,
  PublishChatbotParams,
  UpdateChatbotConfigParams,
  UpdateChatbotDocumentsParams,
  UpdateChatbotOnboardingParams,
  UpdateChatbotPromptParams,
} from '../types/chatbot';
export const chatbotApi = {
  getAllChatbots: () => GET<Chatbot[]>(API_ENDPOINTS.GET_ALL_CHATBOTS),

  getChatbotById: (id: string) =>
    GET<Chatbot>(API_ENDPOINTS.GET_CHATBOT_BY_ID.replace(':id', id)),

  createChatbot: (params: CreateChatbotInParams) =>
    POST(
      API_ENDPOINTS.CREATE_CHATBOT.replace(':user_id', params.user_id),
      params,
    ),

  updateChatbotConfig: (params: UpdateChatbotConfigParams) =>
    PATCH(
      API_ENDPOINTS.UPDATE_CHATBOT_CONFIG_BASIC.replace(
        ':user_id',
        params.user_id,
      ).replace(':chatbot_id', params.chatbot_id),
      params,
    ),

  updateChatbotPrompt: (params: UpdateChatbotPromptParams) =>
    PATCH(
      API_ENDPOINTS.UPDATE_CHATBOT_PROMPT.replace(
        ':user_id',
        params.user_id,
      ).replace(':chatbot_id', params.chatbot_id),
      params,
    ),

  updateChatbotDocuments: (params: UpdateChatbotDocumentsParams) =>
    PATCH(
      API_ENDPOINTS.UPDATE_CHATBOT_DOCUMENTS.replace(
        ':user_id',
        params.user_id,
      ).replace(':chatbot_id', params.chatbot_id),
      params,
    ),

  updateChatbotOnboarding: (params: UpdateChatbotOnboardingParams) =>
    PATCH(
      API_ENDPOINTS.UPDATE_ONBOARDING_CHATBOT.replace(
        ':user_id',
        params.user_id,
      ).replace(':chatbot_id', params.chatbot_id),
      params,
    ),

  createChatbotPrompt: (params: CreateChatbotPromptParams) =>
    POST(
      API_ENDPOINTS.CREATE_CHATBOT_PROMPT.replace(':user_id', params.user_id),
      params,
    ),

  publishChatbot: (params: PublishChatbotParams) =>
    POST(
      API_ENDPOINTS.PUBLISH_CHATBOT.replace(':user_id', params.user_id).replace(
        ':chatbot_id',
        params.chatbot_id,
      ),
      params,
    ),

  createOnboardingChatbot: (params: CreateChatbotOnboardingParams) =>
    POST(
      API_ENDPOINTS.CREATE_ONBOARDING_CHATBOT.replace(
        ':user_id',
        params.user_id,
      ).replace(':chatbot_id', params.chatbot_id),
      params,
    ),
};

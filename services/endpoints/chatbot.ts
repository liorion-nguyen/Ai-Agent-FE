import { GET, PATCH, POST } from '@/services/api';
import { API_ENDPOINTS } from '@/shared/constants';
import {
  ChatbotResponse,
  ChatbotsResponse,
  CreateChatbotCozeInParams,
  CreateChatbotCozeResponse,
  CreateChatbotDbInParams,
  CreateChatbotDbResponse,
  CreateChatbotOnboardingParams,
  CreateChatbotPromptParams,
  PublishChatbotParams,
  SendMessageParams,
  UpdateChatbotConfigParams,
  UpdateChatbotOnboardingParams,
  UpdateChatbotPromptParams,
} from '../types/chatbot';
export const chatbotApi = {
  getAllChatbots: () => GET<ChatbotsResponse>(API_ENDPOINTS.GET_ALL_CHATBOTS),

  getChatbotById: (id: string) =>
    GET<ChatbotResponse>(API_ENDPOINTS.GET_CHATBOT_BY_ID.replace(':id', id)),

  createChatbotDb: (params: CreateChatbotDbInParams) =>
    POST<CreateChatbotDbResponse>(
      API_ENDPOINTS.CREATE_CHATBOT_DB.replace(':user_id', params.user_id || ''),
      params,
    ),

  createChatbotCoze: (params: CreateChatbotCozeInParams) => {
    const { chatbot_id, ...rest } = params;
    return PATCH<CreateChatbotCozeResponse>(
      API_ENDPOINTS.CREATE_CHATBOT_COZE.replace(
        ':user_id',
        params.user_id || '',
      ).replace(':chatbot_id', chatbot_id),
      rest,
    );
  },

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

  sendMessage: (params: SendMessageParams) =>
    POST(
      API_ENDPOINTS.SEND_MESSAGE.replace(':user_id', params.user_id).replace(
        ':chatbot_id',
        params.chatbot_id,
      ),
      params,
    ),
};

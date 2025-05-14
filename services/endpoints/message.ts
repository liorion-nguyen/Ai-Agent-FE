import { GET, POST } from '@/services/api';
import {
  CreateConversationParams,
  CreateConversationResponse,
  GetDialogBoxMessagesParams,
  GetDialogBoxMessagesResponse,
  GetDialogBoxsParams,
  GetDialogBoxsResponse,
  InitCheckActiveChatbotParams,
  InitCheckActiveChatbotResponse,
} from '@/services/types/message';
import { API_ENDPOINTS } from '@/shared/constants';

export const messageApi = {
  initCheckActiveChatbot: (params: InitCheckActiveChatbotParams) =>
    GET<InitCheckActiveChatbotResponse>(
      API_ENDPOINTS.INIT_CHECK_ACTIVE_CHATBOT.replace(
        ':user_id',
        params.user_id,
      )
        .replace(':chatbot_id', params.chatbot_id)
        .replace(':token', params.api_token),
    ),

  createConversation: (params: CreateConversationParams) =>
    POST<CreateConversationResponse>(API_ENDPOINTS.CREATE_CONVERSATION, params),

  getDialogBoxs: (params: GetDialogBoxsParams) =>
    GET<GetDialogBoxsResponse>(
      API_ENDPOINTS.GET_DIALOG_BOXS.replace(':user_id', params.user_id).replace(
        ':chatbot_id',
        params.chatbot_id,
      ),
    ),

  getDialogBoxMessages: (params: GetDialogBoxMessagesParams) =>
    GET<GetDialogBoxMessagesResponse>(
      API_ENDPOINTS.GET_DIALOG_BOX_MESSAGES.replace(
        ':conversationId',
        params.conversationId,
      ),
    ),
};

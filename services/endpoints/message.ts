import { GET, POST } from '@/services/api';
import { CreateConversationParams, CreateConversationResponse, InitCheckActiveChatbotParams, InitCheckActiveChatbotResponse, MessageParams } from '@/services/types/message';
import { API_ENDPOINTS } from '@/shared/constants';

export const messageApi = {
  sendMessage: async (
    messageData: MessageParams,
  ): Promise<ReadableStream<Uint8Array>> => {
    const { userId, chatbotId, message, conversationId } = messageData;
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/chatbot-embed/send`;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_id: conversationId,
        chatbot_id: chatbotId,
        user_id: userId,
        message: message,
      }),
    });

    if (!response.body) {
      throw new Error('Response body is null');
    }

    return response.body;
  },

  initCheckActiveChatbot: (params: InitCheckActiveChatbotParams) =>
    GET<InitCheckActiveChatbotResponse>(
      API_ENDPOINTS.INIT_CHECK_ACTIVE_CHATBOT.replace(':user_id', params.user_id).replace(':chatbot_id', params.chatbot_id).replace(':token', params.api_token),
    ),

  createConversation: (params: CreateConversationParams) =>
    POST<CreateConversationResponse>(
      API_ENDPOINTS.CREATE_CONVERSATION,
      {
        user_id: params.user_id,
        chatbot_id: params.chatbot_id,
      },
    ),

};

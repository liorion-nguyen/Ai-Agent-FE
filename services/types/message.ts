export interface MessagePreviewParams {
  user_id: string;
  chatbot_id: string;
  message: string;
  api_token: string;
}

export interface MessageParams {
  chatbotId: string;
  message: string;
  userId: string;
  conversationId: string;
}

export interface MessageResponse {
  success: boolean;
  message: string;
  data: {
    message: string;
    response: string;
  };
}

export interface InitCheckActiveChatbotParams {
  user_id: string;
  chatbot_id: string;
  api_token: string;
}

export interface InitCheckActiveChatbotResponse {
  status: string;
  data: {
    chatbotId: string;
    userId: string;
  };
}

export interface CreateConversationParams {
  user_id: string;
  chatbot_id: string;
}

export interface CreateConversationResponse {
  id: string;
  external_conversation_id: string;
  started_at: string;
  ended_at: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  chatbot: {
    id: string;
  };
}

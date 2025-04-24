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
}

export interface MessageResponse {
  success: boolean;
  message: string;
  data: {
    message: string;
    response: string;
  };
}

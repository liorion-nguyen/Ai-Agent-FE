import { MessageParams } from '../types/message';

export const messageApi = {
  sendMessage: async (
    messageData: MessageParams,
  ): Promise<ReadableStream<Uint8Array>> => {
    const { userId, chatbotId, message } = messageData;
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/chatbots/${chatbotId}/iframe/chat`;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.body) {
      throw new Error('Response body is null');
    }

    return response.body;
  },
};

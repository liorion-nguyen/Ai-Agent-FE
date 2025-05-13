import { ACCESS_TOKEN } from '@/shared/constants';
import { getTokenFromCookie } from '@/shared/utils/cookie';
import { processStreamData } from '@/shared/utils/stream';
import { useMessageStore } from '@/store/message';
import useUserStore from '@/store/user';

export const useSendMessage = () => {
  const {
    addMessage,
    setLoading,
    setError,
    setStreaming,
    conversationId,
    setConversationId,
  } = useMessageStore();
  const { user, apiToken } = useUserStore();

  const sendMessage = async (chatbotId: string, message: string) => {
    try {
      setLoading(true);
      setError(null);
      setStreaming(true);

      addMessage({
        id: crypto.randomUUID(),
        content: message,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sender: 'user',
      });

      const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/users/${user?.id}/chatbots/${chatbotId}/chat`;
      const TOKEN = getTokenFromCookie(ACCESS_TOKEN);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          message,
          api_token: apiToken,
        }),
      });

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Reader not found');
      }

      await processStreamData(reader);
    } catch (error) {
      const errorMessage = 'Gửi tin nhắn thất bại!';
      setError(errorMessage);
      setStreaming(false);
      console.error('Error:', error);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    sendMessage,
    loading: useMessageStore((state) => state.loading),
    error: useMessageStore((state) => state.error),
    conversationId,
    setConversationId,
  };
};

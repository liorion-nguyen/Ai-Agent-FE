// utils/stream.ts
import { useToast } from '@/shared/hooks';
import useMessageStore from '@/store/message';
import JSONbig from 'json-bigint';

export const processStreamData = async (
  reader: ReadableStreamDefaultReader<Uint8Array>,
) => {
  const { toast } = useToast();
  const { updateLastBotMessage, setStreaming } = useMessageStore.getState();
  const decoder = new TextDecoder('utf-8');
  let botReply = '';
  let buffer = '';

  const parseJsonSafely = (jsonString: string) => {
    try {
      return JSONbig.parse(jsonString);
    } catch (error) {
      console.error('Error parsing JSON:', error, 'Raw data:', jsonString);
      return null;
    }
  };

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const eventBlocks = buffer.split('\n\n');
      buffer = eventBlocks.pop() || '';

      for (const block of eventBlocks) {
        const lines = block.trim().split('\n');
        const eventLine = lines.find((line) => line.startsWith('event:'));
        const dataLine = lines.find((line) => line.startsWith('data:'));

        if (!eventLine || !dataLine) continue;

        const eventType = eventLine.replace('event:', '').trim();
        const dataStr = dataLine.replace('data:', '').trim();
        const data = parseJsonSafely(dataStr);

        if (!data) continue;

        switch (eventType) {
          case 'conversation.message.delta':
            if (data.role === 'assistant' && data.type === 'answer') {
              botReply += data.content;
              updateLastBotMessage(botReply);
            }
            break;

          case 'conversation.message.completed':
            botReply = data.content;
            updateLastBotMessage(botReply);
            setStreaming(false);
            return;

          case 'done':
            setStreaming(false);
            return;

          default:
            break;
        }
      }
    }

    setStreaming(false);
  } catch (error) {
    setStreaming(false);
    toast({
      title: 'Error',
      description: 'Failed to process stream data',
      variant: 'destructive',
    });
    console.error('Stream error:', error);
  }
};

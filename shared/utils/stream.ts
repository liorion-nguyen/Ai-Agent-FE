import { useMessageStore } from '@/store/message';
import JSONbig from 'json-bigint';

const parseJsonSafely = (jsonString: string) => {
  try {
    return JSONbig.parse(jsonString);
  } catch (error) {
    console.error('Error parsing JSON:', error, 'Raw data:', jsonString);
    return null;
  }
};

export const processStreamData = async (
  reader: ReadableStreamDefaultReader<Uint8Array>,
  onMessageUpdate?: (message: string) => void,
  onStreamEnd?: () => void,
): Promise<void> => {
  const decoder = new TextDecoder('utf-8');
  let botReply = '';
  let buffer = '';
  const isFirstMessage = true;

  while (isFirstMessage) {
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
            useMessageStore.getState().updateLastBotMessage(botReply);
            onMessageUpdate?.(botReply);
          }
          break;

        case 'conversation.message.completed':
          botReply = data.content || botReply;
          useMessageStore.getState().updateLastBotMessage(botReply);
          useMessageStore.getState().setStreaming(false);
          onStreamEnd?.();
          return;

        case 'done':
          useMessageStore.getState().setStreaming(false);
          onStreamEnd?.();
          return;

        default:
          break;
      }
    }
  }

  useMessageStore.getState().setStreaming(false);
  onStreamEnd?.();
};

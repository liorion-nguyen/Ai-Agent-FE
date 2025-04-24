import { API_ENDPOINTS } from '@/shared/constants';
import { POST } from '../api';
import { MessageParams, MessagePreviewParams } from '../types/message';
import {} from '../types/message';

export const messageApi = {
  postMessagePreview: (params: MessagePreviewParams) =>
    POST(API_ENDPOINTS.SEND_MESSAGE_REVIEW, params),

  postMessage: (params: MessageParams) =>
    POST(API_ENDPOINTS.SEND_MESSAGE, params),
};

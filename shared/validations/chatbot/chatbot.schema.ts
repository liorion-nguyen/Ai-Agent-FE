import { z } from 'zod';

export const updateChatbotSchema = z.object({
  name: z.string().min(1, 'Tên chatbot không được để trống'),
  businessName: z.string().min(1, 'Tên doanh nghiệp không được để trống'),
  language: z.enum(['Tiếng Việt', 'English'], {
    message: 'Vui lòng chọn ngôn ngữ hợp lệ',
  }),
  theme: z.string().min(1, 'Màu sắc không được để trống'),
  thumbnail: z.string().optional(),
});

export const createChatbotSchema = z.object({
  chatbot_name: z.string().min(1, 'Vui lòng nhập tên bot'),
  industry: z.string().optional(),
  thumbnail: z.string().optional(),
  description: z.string().optional(),
  // prompt: z.string().min(1, 'Vui lòng nhập kích bản mẫu'),
});

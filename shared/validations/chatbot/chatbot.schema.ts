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
  name: z.string().min(1, 'Vui lòng nhập tên bot'),
  prompt: z.string().min(1, 'Vui lòng nhập kích bản mẫu'),
  industry: z.string().min(1, 'Vui lòng chọn ngành nghề'),
  greeting: z.string().min(1, 'Vui lòng nhập câu chào hỏi'),
  avatar: z.string().optional(),
});

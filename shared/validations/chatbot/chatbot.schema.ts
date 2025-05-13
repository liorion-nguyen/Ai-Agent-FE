import { z } from 'zod';

export const updateChatbotSchema = z.object({
  chatbot_name: z.string().min(1, 'Tên chatbot không được để trống'),
  description: z.string().optional(),
  businessName: z.string().optional(),
  language: z.enum(['Tiếng Việt', 'English']).optional(),
  theme: z.string().min(1, 'Màu sắc không được để trống').optional(),
  thumbnail: z.string().optional(),
  model: z.string().optional(),
});

export const createChatbotSchema = z.object({
  chatbot_name: z.string().min(1, 'Vui lòng nhập tên bot'),
  industry: z.string().optional(),
  thumbnail: z.string().optional(),
  description: z.string().optional(),
  // prompt: z.string().min(1, 'Vui lòng nhập kích bản mẫu'),
});

export const purchaseSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập họ tên!'),
  phone: z.string().min(1, 'Vui lòng nhập số điện thoại!'),
  note: z.string().optional(),
});

export const tokenSchema = z.object({
  tokenName: z.string().min(1, 'Tên token là bắt buộc'),
  expiration: z.string().min(1, 'Hạn sử dụng là bắt buộc'),
  customDays: z.number().min(1, 'Số ngày phải lớn hơn 0').optional(),
});

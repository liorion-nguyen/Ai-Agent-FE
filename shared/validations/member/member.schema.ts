import { z } from 'zod';

export const memberSchema = z.object({
  fullName: z.string().min(1, 'Tên thành viên là bắt buộc'),
  email: z.string().min(1, 'Email là bắt buộc'),
  role: z.string().min(1, 'Vai trò là bắt buộc'),
  password: z.string().min(1, 'Mật khẩu là bắt buộc'),
});

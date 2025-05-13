import { MemberRole } from '@/shared/constants/member';
import { z } from 'zod';

export const memberSchema = z.object({
  email: z.string().min(1, 'Email là bắt buộc').email('Email không hợp lệ'),
  role: z.nativeEnum(MemberRole, {
    message: 'Vai trò là bắt buộc',
  }),
});

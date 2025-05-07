import { z } from 'zod';

export const requestSchema = z.object({
  issue: z.string().nonempty('Vấn đề là bắt buộc'),
  department: z.string().nonempty('Bộ phận là bắt buộc'),
  description: z.string().nonempty('Mô tả là bắt buộc'),
  file: z.any().optional(),
});

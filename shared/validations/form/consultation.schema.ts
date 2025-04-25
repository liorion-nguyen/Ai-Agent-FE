import { z } from 'zod';

export const consultationFormSchema = z.object({
  name: z.string().min(1, 'Tên không được để trống'),
  phone: z.string().min(1, 'Số điện thoại không được để trống'),
  businessField: z.string().min(1, 'Lĩnh vực kinh doanh không được để trống'),
});

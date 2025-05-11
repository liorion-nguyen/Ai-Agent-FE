import { z } from 'zod';

export const domainSchema = z.object({
  domain: z.string().min(1),
  description: z.string().optional(),
});

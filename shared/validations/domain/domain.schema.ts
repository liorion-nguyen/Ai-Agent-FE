import { DomainStatus } from '@/shared/constants';
import { z } from 'zod';

export const domainSchema = z.object({
  domain: z.string().min(1),
  status: z.nativeEnum(DomainStatus),
  description: z.string().min(1),
});

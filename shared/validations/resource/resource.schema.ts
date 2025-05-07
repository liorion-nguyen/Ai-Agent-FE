import { z } from 'zod';

export const createResourceSchema = z.object({
  resource_name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be 100 characters or less'),
  description: z
    .string()
    .max(2000, 'Description must be 2000 characters or less')
    .optional(),
  external_type_name: z.enum(['text', 'image']),
  import_type: z.enum([
    'local',
    'online',
    'notion',
    'google',
    'lark',
    'custom',
  ]),
  icon: z.string().optional(),
});

export const uploadFileSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) =>
        [
          'application/pdf',
          'text/plain',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'text/markdown',
        ].includes(file.type),
      { message: 'Only PDF, TXT, DOC, DOCX, and MD files are allowed.' },
    )
    .refine((file) => file.size <= 100 * 1024 * 1024, {
      message: 'File size must not exceed 100MB.',
    }),
});

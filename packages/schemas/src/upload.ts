import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const uploadMulterImageSchema = z.object({
  mimetype: z.string().optional(),
  size: z.number().max(MAX_FILE_SIZE, {
    message: `File size must be less than 5MB.`,
  }),
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  buffer: z.any(),
});

import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const floodReportSchema = z.object({
  id: z.number(),
  userId: z.number(),
  name: z.string(),
  email: z.string(),
  profilePicture: z.string().optional(),
  location: z.string(),
  severity: z.enum(['low', 'medium', 'high']),
  status: z.enum(['verified', 'unverified']),
  description: z.string().optional(),
  range: z.string().optional(),
  reportedAt: z.string(),
});

export class FloodReportDto extends createZodDto(floodReportSchema) {}

export type FloodReportInput = z.infer<typeof floodReportSchema>;

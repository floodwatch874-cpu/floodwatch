import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const reportFloodAlertSchema = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  range: z.coerce.number(),
  description: z.string().optional(),
  severity: z.enum(['low', 'moderate', 'high', 'critical']),
});

export const reportsSchema = z.object({
  id: z.string(),
  reporter: z
    .object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
      profilePicture: z.string(),
    })
    .nullable(),
  severity: z.enum(['low', 'moderate', 'high', 'critical']),
  status: z.enum(['verified', 'unverified']),
  description: z.string().nullable(),
  range: z.number(),
  longitude: z.number(),
  latitude: z.number(),
  location: z.string(),
  image: z.string().nullable(),
  reportedAt: z.string(),
});

export const reportQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.enum(['unverified', 'verified']).optional(),
  q: z.string().optional(),
});

export class ReportFloodAlertDto extends createZodDto(reportFloodAlertSchema) {}
export class ReportsDto extends createZodDto(reportsSchema) {}
export class ReportQueryDto extends createZodDto(reportQuerySchema) {}

export type ReportsInput = z.infer<typeof reportsSchema>;
export type ReportFloodAlertInput = z.infer<typeof reportFloodAlertSchema>;
export type ReportQueryInput = z.infer<typeof reportQuerySchema>;

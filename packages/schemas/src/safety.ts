import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createSafetyLocationSchema = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  description: z.string().optional(),
  type: z.enum(['shelter', 'hospital']),
});

export class CreateSafetyLocationDto extends createZodDto(
  createSafetyLocationSchema,
) {}

export type CreateSafetyLocationInput = z.infer<
  typeof createSafetyLocationSchema
>;

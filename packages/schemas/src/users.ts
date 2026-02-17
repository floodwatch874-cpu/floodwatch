import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const usersSchema = z.object({
  id: z.number(),
  email: z.email(),
  role: z.enum(['admin', 'user']),
  status: z.enum(['active', 'blocked']),
  name: z.string().min(1),
  profilePicture: z.string().optional(),
  homeAddress: z.string().optional(),
  joinDate: z.string(),
});

export const getMeSchema = z.object({
  id: z.number(),
  email: z.email(),
  role: z.enum(['admin', 'user']),
  status: z.enum(['active', 'blocked']),
  firstName: z.string(),
  lastName: z.string(),
  name: z.string().min(1),
  profilePicture: z.string().optional(),
  homeAddress: z.string().optional(),
  createdAt: z.string(),
});

export const updateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  homeAddress: z.string().optional(),
  profilePicture: z.string().optional(),
});

export const userQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.enum(['active', 'blocked']).optional(),
  q: z.string().optional(),
});

export class UsersDto extends createZodDto(usersSchema) {}
export class GetMeDto extends createZodDto(getMeSchema) {}
export class UpdateProfileDto extends createZodDto(updateProfileSchema) {}
export class UserQueryDto extends createZodDto(userQuerySchema) {}

export type UsersInput = z.infer<typeof usersSchema>;
export type GetMeInput = z.infer<typeof getMeSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UserQueryInput = z.infer<typeof userQuerySchema>;

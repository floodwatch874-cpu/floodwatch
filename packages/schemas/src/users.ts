import { z } from 'zod';

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

export type UsersDto = z.infer<typeof usersSchema>;
export type GetMeDto = z.infer<typeof getMeSchema>;

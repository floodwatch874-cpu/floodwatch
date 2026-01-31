import { z } from 'zod';

export const usersSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  profilePicture: z.string().optional(),
  email: z.email(),
  role: z.enum(['admin', 'user']),
  joinDate: z.string(),
  status: z.enum(['active', 'blocked']),
});

export type UsersDto = z.infer<typeof usersSchema>;

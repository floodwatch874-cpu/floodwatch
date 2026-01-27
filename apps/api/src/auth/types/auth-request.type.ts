import { Request } from 'express';
import type { InferSelectModel } from 'drizzle-orm';
import { users } from 'src/drizzle/schemas/users.schema';

export type User = InferSelectModel<typeof users>;

export interface AuthRequest extends Request {
  user: User;
}

export interface RefreshTokenRequest extends Request {
  user: {
    id: number;
    role: string;
  };
  cookies: {
    refresh_token: string;
    device_id: string;
  };
}

export interface LogoutRequest extends Request {
  user: {
    id: number;
  };
  cookies: {
    device_id: string;
  };
}

import { Request } from 'express';

export interface MeRequest extends Request {
  user: {
    id: number;
  };
}

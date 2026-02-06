import { Request } from 'express';

export interface GoogleLinkRequest extends Request {
  user: {
    id: number;
    email: string;
    role: string;
  };
  google: {
    googleId: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
}

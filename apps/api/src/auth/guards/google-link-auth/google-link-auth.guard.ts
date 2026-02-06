import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { Request } from 'express';

interface GoogleLinkRequest extends Request {
  google?: any;
}

@Injectable()
export class GoogleLinkAuthGuard extends AuthGuard('google-link') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<GoogleLinkRequest>();

    // store the jwt user on the request for later use
    const jwtUser = request.user;

    const result = (await super.canActivate(context)) as boolean;

    // after the Google OAuth process, the Google profile will be available
    // on the request object as 'user' (set by passport)
    const googleProfile = request.user;

    // attach both jwt user and google profile to request for later use
    request.user = jwtUser;
    request.google = googleProfile;

    return result;
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthRequest } from 'src/auth/types/auth-request.type';

@Injectable()
export class UserStatusGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: AuthRequest = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) return true; // If there's no user, allow the request to proceed (e.g., for public routes)

    if (user.status === 'blocked') {
      return false; // Block the request if the user is blocked
    }

    return true;
  }
}

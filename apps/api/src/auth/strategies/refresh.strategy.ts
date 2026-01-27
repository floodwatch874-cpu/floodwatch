import { Inject, Injectable } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtRefreshConfig from 'src/config/jwt-refresh.config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ValidatedUser } from '../interfaces/validated-user.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @Inject(jwtRefreshConfig.KEY)
    private jwtRefreshConfiguration: ConfigType<typeof jwtRefreshConfig>,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const token = req.cookies?.refresh_token as string | undefined;
          return token ?? null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtRefreshConfiguration.secret as string,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<ValidatedUser> {
    const token = req.cookies?.refresh_token as string | undefined;
    const user = await this.usersService.findByIdWithProfile(payload.sub);

    return {
      id: payload.sub,
      role: user.role,
      refresh_token: token,
    };
  }
}

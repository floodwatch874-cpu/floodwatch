import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { TokenService } from '../token/token.service';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

@Injectable()
export class GoogleService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async handleGoogleLogin(googleUser: {
    googleId: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  }) {
    let user = await this.usersService.findByEmail(googleUser.email);

    if (!user) {
      user = await this.usersService.createUser(googleUser.email);
      await this.usersService.createAuthAccount(
        user.id,
        'google',
        googleUser.googleId,
      );
      await this.usersService.createUserProfile(
        user.id,
        googleUser.firstName,
        googleUser.lastName,
        '',
      );
    } else {
      const googleAuth = await this.usersService.findAuthAccount(
        user.id,
        'google',
      );

      if (!googleAuth) {
        await this.usersService.createAuthAccount(
          user.id,
          'google',
          googleUser.googleId,
        );
      }

      // Update profile picture if not set
      const profile = await this.usersService.findProfileByUserId(user.id);
      if (profile && !profile.profilePicture) {
        await this.usersService.updateProfile(user.id, {
          profilePicture: googleUser.profilePicture,
        });
      }
    }

    const payload: JwtPayload = {
      sub: user.id,
      role: user.role,
    };

    const access_token = this.tokenService.signAccessToken(payload);
    const refresh_token = this.tokenService.signRefreshToken(payload);

    const hashedToken = await bcrypt.hash(refresh_token, 10);
    const deviceId = randomUUID();

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.refreshTokenService.setRefreshToken(
      user.id,
      deviceId,
      hashedToken,
      expiresAt,
    );

    return { access_token, refresh_token, deviceId, user };
  }

  async linkGoogleAccount(
    user: { id: number },
    google: {
      googleId: string;
      email: string;
      firstName: string;
      lastName: string;
      profilePicture: string;
    },
  ) {
    const existingUser = await this.usersService.findById(user.id);
    if (!existingUser) throw new NotFoundException('User not found');

    // enforce same email
    if (existingUser.email !== google.email) {
      throw new ConflictException('Google email must match your account email');
    }

    const googleAuth = await this.usersService.findAuthAccount(
      existingUser.id,
      'google',
    );
    if (googleAuth) {
      throw new ConflictException('You already linked a Google account');
    }

    await this.usersService.createAuthAccount(
      existingUser.id,
      'google',
      google.googleId,
    );
  }
}

import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SetPasswordInput, SignUpInput } from '@repo/schemas';
import { TokenService } from './token/token.service';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new ForbiddenException();

    const isPasswordValid = await this.usersService.validatePassword(
      user.id,
      password,
    );

    if (!isPasswordValid) throw new UnauthorizedException();

    return user;
  }

  async login(userId: number, role: string) {
    const payload: JwtPayload = { sub: userId, role };

    const access_token = this.tokenService.signAccessToken(payload);
    const refresh_token = this.tokenService.signRefreshToken(payload);

    // hash refresh token to be inserted to db
    const hashedToken = await bcrypt.hash(refresh_token, 10);

    // random uuid for deviceId, unique only to that device
    const deviceId = randomUUID();

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.refreshTokenService.setRefreshToken(
      userId,
      deviceId,
      hashedToken,
      expiresAt,
    );

    return { access_token, refresh_token, deviceId };
  }

  async refreshToken(
    userId: number,
    role: string,
    deviceId: string,
    rawToken: string,
  ) {
    // validate refresh token
    const isValid = await this.refreshTokenService.validateRefreshToken(
      userId,
      deviceId,
      rawToken,
    );

    if (!isValid) throw new UnauthorizedException('Invalid refresh token');

    const payload: JwtPayload = { sub: userId, role };

    // signing tokens
    const access_token = this.tokenService.signAccessToken(payload);
    const refresh_token = this.tokenService.signRefreshToken(payload);

    const hashedToken = await bcrypt.hash(refresh_token, 10);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // rotate refresh token
    await this.refreshTokenService.setRefreshToken(
      userId,
      deviceId,
      hashedToken,
      expiresAt,
    );

    return { access_token, refresh_token, deviceId };
  }

  async signup(signUpData: SignUpInput) {
    const { email, password, first_name, last_name, home_address } = signUpData;

    const user = await this.usersService.findByEmail(email);
    if (user) throw new ConflictException('Email already in use');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.createUser(email);
    await this.usersService.createAuthAccount(
      newUser.id,
      'local',
      email,
      hashedPassword,
    );
    await this.usersService.createUserProfile(
      newUser.id,
      first_name,
      last_name,
      home_address,
    );

    const payload: JwtPayload = {
      sub: newUser.id,
      role: newUser.role,
    };

    const access_token = this.tokenService.signAccessToken(payload);
    const refresh_token = this.tokenService.signRefreshToken(payload);

    const hashedToken = await bcrypt.hash(refresh_token, 10);

    const deviceId = randomUUID();

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.refreshTokenService.setRefreshToken(
      newUser.id,
      deviceId,
      hashedToken,
      expiresAt,
    );

    return { access_token, refresh_token, deviceId, newUser };
  }

  async logout(userId: number, deviceId: string) {
    await this.refreshTokenService.removeRefreshToken(userId, deviceId);
  }

  async setPassword(userId: number, setPasswordDto: SetPasswordInput) {
    const { new_password } = setPasswordDto;

    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const hashedPassword = await bcrypt.hash(new_password, 12);

    await this.usersService.createAuthAccount(
      userId,
      'local',
      user.email,
      hashedPassword,
    );
  }
}

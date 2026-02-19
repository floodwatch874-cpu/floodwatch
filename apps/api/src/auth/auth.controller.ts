import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  Request,
  Res,
  Delete,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  logInSchema,
  SetPasswordDto,
  setPasswordSchema,
  SignUpDto,
  signUpSchema,
} from '@repo/schemas';
import { type AuthRequest } from './types/auth-request.type';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { JwtRefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { type Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { clearAuthCookies, setAuthCookies } from 'src/auth/utils/auth-util';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { type RefreshTokenRequest } from './types/refresh-token-request.type';
import { type LogoutRequest } from './types/logout-request.type';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @UsePipes(new ZodValidationPipe(logInSchema))
  async login(
    @Request() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token, deviceId } =
      await this.authService.login(req.user.id, req.user.role);

    const isProduction =
      this.configService.getOrThrow('NODE_ENV') === 'production';
    setAuthCookies(res, access_token, refresh_token, deviceId, isProduction);

    return { user: req.user };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(
    @Request() req: RefreshTokenRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    const deviceId = req.cookies['device_id'];

    const {
      access_token,
      refresh_token,
      deviceId: device_id,
    } = await this.authService.refreshToken(
      req.user.id,
      req.user.role,
      deviceId,
      refreshToken,
    );

    const isProduction =
      this.configService.getOrThrow('NODE_ENV') === 'production';
    setAuthCookies(res, access_token, refresh_token, device_id, isProduction);

    return { success: true };
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(signUpSchema))
  async signup(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('Signup request received for email:', signUpDto.email);

    const {
      access_token,
      refresh_token,
      deviceId,
      newUser: user,
    } = await this.authService.signup(signUpDto);

    const isProduction =
      this.configService.getOrThrow('NODE_ENV') === 'production';
    setAuthCookies(res, access_token, refresh_token, deviceId, isProduction);

    return { user };
  }

  @Delete('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async logout(
    @Request() req: LogoutRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('Logout request received for user:', req.user.id);

    const deviceId = req.cookies['device_id'];

    await this.authService.logout(req.user.id, deviceId);

    const isProduction =
      this.configService.getOrThrow('NODE_ENV') === 'production';
    clearAuthCookies(res, isProduction);

    return { message: 'Logged out successfully' };
  }

  @Post('set-password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(setPasswordSchema))
  async setPassword(
    @Body() setPasswordDto: SetPasswordDto,
    @Request() req: AuthRequest,
  ) {
    await this.authService.setPassword(req.user.id, setPasswordDto);
  }
}

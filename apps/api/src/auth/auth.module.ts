import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import jwtConfig from 'src/config/jwt.config';
import jwtRefreshConfig from 'src/config/jwt-refresh.config';
import { JwtRefreshStrategy } from './strategies/refresh.strategy';
import { TokenService } from './token/token.service';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { RedisModule } from 'src/redis/redis.module';
import googleOauthConfig from 'src/config/google-oauth.config';
import { GoogleStrategy } from './strategies/google.strategy';
import { ChangePasswordController } from './change-password/change-password.controller';
import { ChangePasswordService } from './change-password/change-password.service';
import { GoogleController } from './google/google.controller';
import { GoogleService } from './google/google.service';
import { ForgotPasswordController } from './forgot-password/forgot-password.controller';
import { ForgotPasswordService } from './forgot-password/forgot-password.service';
import googleOauthLinkConfig from 'src/config/google-oauth-link.config';
import { GoogleLinkStrategy } from './strategies/google-link.strategy';

@Module({
  imports: [
    DrizzleModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(jwtRefreshConfig),
    ConfigModule.forFeature(googleOauthConfig),
    ConfigModule.forFeature(googleOauthLinkConfig),
    MailerModule,
    RedisModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    TokenService,
    RefreshTokenService,
    GoogleStrategy,
    GoogleLinkStrategy,
    ChangePasswordService,
    GoogleService,
    ForgotPasswordService,
  ],
  controllers: [
    AuthController,
    ChangePasswordController,
    GoogleController,
    ForgotPasswordController,
  ],
})
export class AuthModule {}

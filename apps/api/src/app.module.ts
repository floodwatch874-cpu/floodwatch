import { Module } from '@nestjs/common';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { RedisModule } from './redis/redis.module';
import { LoggerModule } from 'nestjs-pino';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ImagesModule } from './images/images.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (_req, _res) => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'yyyy-mm-dd HH:MM:ss',
            ignore: 'pid,hostname',
            singleLine: true,
          },
        },
      },
    }),
    DrizzleModule,
    UsersModule,
    AuthModule,
    MailerModule,
    RedisModule,
    CloudinaryModule,
    ImagesModule,
    AdminModule,
  ],
})
export class AppModule {}

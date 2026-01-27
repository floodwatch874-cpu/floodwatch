import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    NestMailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.getOrThrow('EMAIL_HOST'),
          port: Number(configService.getOrThrow('EMAIL_PORT')),
          auth: {
            user: configService.getOrThrow('EMAIL_USERNAME'),
            pass: configService.getOrThrow('EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: '"FloodWatch" <no-reply@floodwatch-web.com>', // sender address
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}

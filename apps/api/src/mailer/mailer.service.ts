import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  constructor(private readonly nestMailerService: NestMailerService) {}

  async sendOtpEmail(to: string, otp: string) {
    await this.nestMailerService.sendMail({
      to,
      subject: `${otp} is your password reset code`,
      template: 'otp', // name of the template file
      context: {
        otp,
      },
    });
  }
}

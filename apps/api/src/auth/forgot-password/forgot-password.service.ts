import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  VerifyOtpDto,
  verifyOtpSchema,
  ResetPasswordDto,
  resetPasswordSchema,
  ResendOtpDto,
  resendOtpSchema,
  sendOtpSchema,
  SendOtpDto,
} from '@repo/schemas';
import { randomUUID } from 'crypto';
import { generateOtp, hashOtp } from '../utils/otp-util';
import { UsersService } from 'src/users/users.service';
import Redis from 'ioredis';
import { MailerService } from 'src/mailer/mailer.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private usersService: UsersService,
    private mailerService: MailerService,
    @Inject('REDIS_CLIENT') private redis: Redis,
  ) {}

  async forgotPassword(sendOtpDto: SendOtpDto) {
    const parsedData = sendOtpSchema.parse(sendOtpDto);
    const { email } = parsedData;

    const user = await this.usersService.findByEmail(email);
    if (!user) return;

    const otp = generateOtp();
    const hashedOtp = await hashOtp(otp);

    await this.redis.set(`otp:reset:${email}`, hashedOtp, 'EX', 300);
    await this.redis.set(`otp:attempts:${email}`, 0, 'EX', 300);

    await this.mailerService.sendOtpEmail(email, otp);

    return;
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const parsedData = verifyOtpSchema.parse(verifyOtpDto);
    const { email, otp } = parsedData;

    const otpKey = `otp:reset:${email}`;
    const attemptsKey = `otp:attempts:${email}`;

    const hashedOtp = await this.redis.get(otpKey);
    if (!hashedOtp) {
      throw new UnauthorizedException('OTP has expired or is invalid');
    }

    const attempts = Number(await this.redis.get(attemptsKey)) || 0;
    if (attempts >= 5) {
      // Max attempts exceeded, delete OTP and attempts
      await this.redis.del(otpKey, attemptsKey);
      throw new UnauthorizedException('Maximum OTP attempts exceeded');
    }

    const isValid = await bcrypt.compare(otp, hashedOtp);
    if (!isValid) {
      await this.redis.incr(attemptsKey);
      throw new UnauthorizedException('Invalid OTP');
    }

    // OTP is valid, proceed with password reset process
    await this.redis.del(otpKey, attemptsKey);

    // generate reset session id and store in redis
    const resetSessionId = randomUUID();
    await this.redis.set(`reset:session:${resetSessionId}`, email, 'EX', 600);

    return { resetSessionId };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const parsedData = resetPasswordSchema.parse(resetPasswordDto);
    const { new_password, resetSessionId } = parsedData;

    const key = `reset:session:${resetSessionId}`;
    const email = await this.redis.get(key);

    if (!email) {
      throw new UnauthorizedException(
        'Invalid or expired reset session. Please verify OTP again.',
      );
    }

    // Find user by email
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Update user's password
    await this.usersService.updatePassword(user.id, new_password);

    // Invalidate the reset session
    await this.redis.del(key);

    return;
  }

  async resendOtp(resendOtpDto: ResendOtpDto) {
    const parsedData = resendOtpSchema.parse(resendOtpDto);
    const { email } = parsedData;

    const user = await this.usersService.findByEmail(email);
    if (!user) return;

    const cooldownKey = `otp:cooldown:${email}`;
    const resendCountKey = `otp:resend-count:${email}`;
    const otpKey = `otp:reset:${email}`;
    const attemptsKey = `otp:attempts:${email}`;

    const existingOtp = await this.redis.get(otpKey);
    if (!existingOtp) {
      throw new BadRequestException(
        'No active OTP found. Please request a new OTP.',
      );
    }

    if (await this.redis.get(cooldownKey)) {
      throw new BadRequestException('Please wait before resending OTP');
    }

    const resendCount = Number(await this.redis.get(resendCountKey)) || 0;
    if (resendCount >= 5) {
      throw new ForbiddenException(
        'Maximum OTP resend attempts reached. Please try again later.',
      );
    }

    const otp = generateOtp();
    const hashedOtp = await hashOtp(otp);

    await this.redis.set(otpKey, hashedOtp, 'EX', 300);
    await this.redis.set(attemptsKey, 0, 'EX', 300);

    await this.redis.set(cooldownKey, '1', 'EX', 30); // 30 seconds cooldown
    await this.redis.incr(resendCountKey); // increment resend count
    await this.redis.expire(resendCountKey, 300); // expire resend count after 5 minutes

    await this.mailerService.sendOtpEmail(email, otp);

    return;
  }
}

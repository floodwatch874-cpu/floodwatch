import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import {
  sendOtpSchema,
  type SendOtpDto,
  verifyOtpSchema,
  type VerifyOtpDto,
  resetPasswordSchema,
  type ResetPasswordDto,
  resendOtpSchema,
  type ResendOtpDto,
} from '@repo/schemas';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { ForgotPasswordService } from './forgot-password.service';

@Controller('auth/forgot-password')
export class ForgotPasswordController {
  constructor(private forgotPasswordService: ForgotPasswordService) {}

  @HttpCode(HttpStatus.OK)
  @Post('send-otp')
  @UsePipes(new ZodValidationPipe(sendOtpSchema))
  async forgotPassword(@Body() sendOtpDto: SendOtpDto) {
    await this.forgotPasswordService.forgotPassword(sendOtpDto);
    return { message: 'OTP sent to your email if it exists' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify-otp')
  @UsePipes(new ZodValidationPipe(verifyOtpSchema))
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    const { resetSessionId } =
      await this.forgotPasswordService.verifyOtp(verifyOtpDto);

    return { resetSessionId };
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  @UsePipes(new ZodValidationPipe(resetPasswordSchema))
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.forgotPasswordService.resetPassword(resetPasswordDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('resend-otp')
  @UsePipes(new ZodValidationPipe(resendOtpSchema))
  async resendOtp(@Body() resendOtpDto: ResendOtpDto) {
    await this.forgotPasswordService.resendOtp(resendOtpDto);
  }
}

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
  SendOtpDto,
  verifyOtpSchema,
  VerifyOtpDto,
  resetPasswordSchema,
  ResetPasswordDto,
  resendOtpSchema,
  ResendOtpDto,
} from '@repo/schemas';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { ForgotPasswordService } from './forgot-password.service';

@Controller('auth/forgot-password')
export class ForgotPasswordController {
  constructor(private forgotPasswordService: ForgotPasswordService) {}

  @Post('send-otp')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(sendOtpSchema))
  async forgotPassword(@Body() sendOtpDto: SendOtpDto) {
    await this.forgotPasswordService.forgotPassword(sendOtpDto);
    return { message: 'OTP sent to your email if it exists' };
  }

  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(verifyOtpSchema))
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    const { resetSessionId } =
      await this.forgotPasswordService.verifyOtp(verifyOtpDto);

    return { resetSessionId };
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(resetPasswordSchema))
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.forgotPasswordService.resetPassword(resetPasswordDto);
  }

  @Post('resend-otp')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(resendOtpSchema))
  async resendOtp(@Body() resendOtpDto: ResendOtpDto) {
    await this.forgotPasswordService.resendOtp(resendOtpDto);
  }
}

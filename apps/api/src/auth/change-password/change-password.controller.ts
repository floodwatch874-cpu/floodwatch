import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  type VerifyOtpSecureDto,
  verifyOtpSecureSchema,
  type ChangePasswordDto,
  changePasswordSchema,
} from '@repo/schemas';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';
import { ChangePasswordService } from './change-password.service';
import { type AuthRequest } from '../types/auth-request.type';

@UseGuards(JwtAuthGuard)
@Controller('auth/change-password')
export class ChangePasswordController {
  constructor(private changePasswordService: ChangePasswordService) {}

  @HttpCode(HttpStatus.OK)
  @Post('send-otp')
  async sendOtp(@Request() req: AuthRequest) {
    await this.changePasswordService.sendOtp(req.user.email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify-otp')
  @UsePipes(new ZodValidationPipe(verifyOtpSecureSchema))
  async verifyOtp(
    @Request() req: AuthRequest,
    @Body() verifyOtpSecureDto: VerifyOtpSecureDto,
  ) {
    const { resetSessionId } = await this.changePasswordService.verifyOtp(
      req.user.email,
      verifyOtpSecureDto,
    );

    return { resetSessionId };
  }

  @HttpCode(HttpStatus.OK)
  @Post('')
  @UsePipes(new ZodValidationPipe(changePasswordSchema))
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    await this.changePasswordService.changePassword(changePasswordDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('resend-otp')
  async resendOtp(@Request() req: AuthRequest) {
    await this.changePasswordService.resendOtp(req.user.email);
  }
}

import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateSafetyLocationDto,
  createSafetyLocationSchema,
} from '@repo/schemas';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { type AuthRequest } from 'src/auth/types/auth-request.type';
import { UserStatusGuard } from 'src/common/guards/user-status/user-status.guard';
import { SafetyService } from './safety.service';

@Controller('safety')
export class SafetyController {
  constructor(private safetyService: SafetyService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, UserStatusGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createSafetyLocation(
    @Request() req: AuthRequest,
    @Body() createSafetyLocationDto: CreateSafetyLocationDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const parsedData = createSafetyLocationSchema.safeParse(
      createSafetyLocationDto,
    );
    if (!parsedData.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        issues: parsedData.error.issues,
      });
    }

    return await this.safetyService.createSafetyLocation(
      req.user.id,
      createSafetyLocationDto,
      image,
    );
  }
}

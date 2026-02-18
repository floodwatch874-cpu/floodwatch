import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Delete,
  Patch,
  UsePipes,
  Body,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { type MeRequest } from 'src/types/me-request.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { type AuthRequest } from 'src/auth/types/auth-request.type';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import {
  type UpdateProfileDto,
  updateProfileSchema,
  UserQueryDto,
} from '@repo/schemas';
import { UserStatusGuard } from 'src/guards/user-status/user-status.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, UserStatusGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() userQueryDto: UserQueryDto) {
    return await this.usersService.findAll(userQueryDto);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getMe(@Request() req: MeRequest) {
    const user = await this.usersService.findByIdWithProfile(req.user.id);

    return user;
  }

  @Patch('me')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(updateProfileSchema))
  async updateProfile(
    @Request() req: MeRequest,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return await this.usersService.updateProfile(req.user.id, updateProfileDto);
  }

  @Post('me/avatar')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @Request() req: AuthRequest,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return await this.usersService.uploadAvatar(req.user.id, file);
  }

  @Delete('me/avatar')
  @HttpCode(HttpStatus.OK)
  async deleteAvatar(@Request() req: AuthRequest) {
    return await this.usersService.deleteAvatar(req.user.id);
  }
}

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { type AuthRequest } from 'src/auth/types/auth-request.type';
import { AdminService } from './admin.service';
import { CreateAdminDto, createAdminSchema } from '@repo/schemas';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(createAdminSchema))
  async createAdmin(
    @Request() req: AuthRequest,
    @Body() createAdminDto: CreateAdminDto,
  ) {
    return await this.adminService.createAdmin(createAdminDto);
  }

  @Patch('users/:id/block')
  @UseGuards(JwtAuthGuard)
  async blockUser(@Param('id') id: number) {
    return await this.adminService.blockUser(id);
  }

  @Patch('users/:id/unblock')
  @UseGuards(JwtAuthGuard)
  async unblockUser(@Param('id') id: number) {
    return await this.adminService.unblockUser(id);
  }
}

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { UserStatusGuard } from 'src/common/guards/user-status/user-status.guard';
import {
  type CreateFloodAlertInput,
  createFloodAlertSchema,
  type ReportFloodAlertInput,
  reportFloodAlertSchema,
  ReportQueryDto,
} from '@repo/schemas';
import { type AuthRequest } from 'src/auth/types/auth-request.type';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllPublic() {
    return await this.reportsService.findAllPublic();
  }

  @Get('admin')
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() reportQuery: ReportQueryDto) {
    return await this.reportsService.findAll(reportQuery);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, UserStatusGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createReport(
    @Request() req: AuthRequest,
    @Body() createFloodAlertDto: ReportFloodAlertInput,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const parsedData = reportFloodAlertSchema.safeParse(createFloodAlertDto);
    if (!parsedData.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        issues: parsedData.error.issues,
      });
    }

    return await this.reportsService.createReport(
      req.user.id,
      createFloodAlertDto,
      image,
    );
  }

  @Post('/admin/create')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, UserStatusGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createReportAdmin(
    @Request() req: AuthRequest,
    @Body() createFloodAlertDto: CreateFloodAlertInput,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const parsedData = createFloodAlertSchema.safeParse(createFloodAlertDto);
    if (!parsedData.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        issues: parsedData.error.issues,
      });
    }

    return await this.reportsService.createReportAdmin(
      req.user.id,
      createFloodAlertDto,
      image,
    );
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, UserStatusGuard)
  async verifyReportStatus(@Param('id') id: string) {
    return await this.reportsService.verifyReportStatus(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, UserStatusGuard)
  async deleteReport(@Param('id') id: string) {
    return await this.reportsService.deleteReport(id);
  }
}

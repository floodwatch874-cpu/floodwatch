import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateFloodAlertInput,
  ReportFloodAlertInput,
  ReportQueryInput,
} from '@repo/schemas';
import { and, count, desc, eq, like, or, sql } from 'drizzle-orm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { DRIZZLE } from 'src/drizzle/drizzle-connection';
import { profileInfo, users } from 'src/drizzle/schemas';
import { reports } from 'src/drizzle/schemas/reports.schema';
import type { DrizzleDB } from 'src/drizzle/types/drizzle';
import { GeocoderService } from 'src/geocoder/geocoder.service';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class ReportsService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private imagesService: ImagesService,
    private cloudinaryService: CloudinaryService,
    private geocoderService: GeocoderService,
  ) {}

  async findAllPublic() {
    return await this.db
      .select({
        id: reports.id,
        location: reports.location,
        description: reports.description,
        latitude: reports.latitude,
        longitude: reports.longitude,
        range: reports.range,
        severity: reports.severity,
        status: reports.status,
        image: reports.image,
        reportedAt: reports.createdAt,
        reporter: {
          id: users.id,
          email: users.email,
          name: sql<string>`CONCAT(${profileInfo.firstName}, ' ', ${profileInfo.lastName})`,
          profilePicture: profileInfo.profilePicture,
        },
      })
      .from(reports)
      .leftJoin(users, eq(reports.userId, users.id))
      .leftJoin(profileInfo, eq(users.id, profileInfo.userId))
      .orderBy(desc(reports.createdAt));
  }

  async findAll(reportQueryDto: ReportQueryInput) {
    const { page, limit, status, q } = reportQueryDto;

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const offset = (pageNumber - 1) * limitNumber;

    // Build search condition once, reused across all queries
    const searchCondition = q
      ? or(
          like(reports.location, `%${q}%`),
          like(users.email, `%${q}%`),
          like(profileInfo.firstName, `%${q}%`),
          like(profileInfo.lastName, `%${q}%`),
          sql`CONCAT(${profileInfo.firstName}, ' ', ${profileInfo.lastName}) ILIKE ${`%${q}%`}`,
        )
      : undefined;

    // Full where clause (search + optional status filter)
    const whereClause =
      status && searchCondition
        ? and(eq(reports.status, status), searchCondition)
        : status
          ? eq(reports.status, status)
          : searchCondition;

    const [data, counts, statsResult] = await Promise.all([
      // Main paginated query
      this.db
        .select()
        .from(reports)
        .leftJoin(users, eq(reports.userId, users.id))
        .leftJoin(profileInfo, eq(users.id, profileInfo.userId))
        .where(whereClause)
        .orderBy(desc(reports.createdAt))
        .limit(limitNumber)
        .offset(offset),

      this.db
        .select({ total: count() })
        .from(reports)
        .leftJoin(users, eq(reports.userId, users.id))
        .leftJoin(profileInfo, eq(users.id, profileInfo.userId))
        .where(whereClause),

      // All counts in a single query using FILTER
      this.db
        .select({
          totalCount: count(),
          verifiedCount: sql<number>`COUNT(*) FILTER (WHERE ${reports.status} = 'verified')`,
          unverifiedCount: sql<number>`COUNT(*) FILTER (WHERE ${reports.status} = 'unverified')`,
        })
        .from(reports)
        .leftJoin(users, eq(reports.userId, users.id))
        .leftJoin(profileInfo, eq(users.id, profileInfo.userId))
        .where(searchCondition),
    ]);

    const { total } = counts[0];
    const { totalCount, verifiedCount, unverifiedCount } = statsResult[0];

    const formattedData = data.map((item) => ({
      id: item.reports.id,
      location: item.reports.location,
      description: item.reports.description,
      image: item.reports.image,
      severity: item.reports.severity,
      status: item.reports.status,
      latitude: item.reports.latitude,
      longitude: item.reports.longitude,
      range: item.reports.range,
      reportedAt: item.reports.createdAt,
      reporter: item.users
        ? {
            id: item.users.id,
            email: item.users.email,
            name: item.profile_info
              ? `${item.profile_info.firstName} ${item.profile_info.lastName}`.trim()
              : '',
            profilePicture: item.profile_info?.profilePicture || '',
          }
        : null,
    }));

    return {
      data: formattedData,
      meta: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages: Math.ceil(total / limitNumber),
        hasNextPage: pageNumber * limitNumber < total,
        hasPrevPage: pageNumber > 1,
      },
      stats: {
        verifiedCount,
        unverifiedCount,
        totalCount,
      },
    };
  }

  async createReport(
    userId: number,
    floodAlertDto: ReportFloodAlertInput,
    image: Express.Multer.File,
  ) {
    const { latitude, longitude, severity, description, range } = floodAlertDto;

    let imageUrl: string | null = null;
    let imagePublicId: string | null = null;

    if (image) {
      const { buffer, mimetype } = await this.imagesService.normalizeImage(
        image.buffer,
      );

      const normalizedFile: Express.Multer.File = {
        ...image,
        buffer,
        mimetype,
        originalname: image.originalname.replace(
          /\.(jpe?g|png|jfif|webp)$/i,
          '.webp',
        ),
      };

      const uploaded = await this.cloudinaryService.uploadImage(
        normalizedFile,
        'reports',
      );

      imageUrl = uploaded.secure_url as string;
      imagePublicId = uploaded.public_id as string;
    }

    const { displayName } = await this.geocoderService.reverseGeocode(
      latitude,
      longitude,
    );

    await this.db.insert(reports).values({
      userId,
      latitude,
      longitude,
      severity,
      description,
      range,
      image: imageUrl,
      imagePublicId,
      location: displayName,
    });

    return { message: 'Report created successfully' };
  }

  async createReportAdmin(
    userId: number,
    floodAlertDto: CreateFloodAlertInput,
    image: Express.Multer.File,
  ) {
    const { latitude, longitude, locationName, severity, description, range } =
      floodAlertDto;

    let imageUrl: string | null = null;
    let imagePublicId: string | null = null;

    if (image) {
      const { buffer, mimetype } = await this.imagesService.normalizeImage(
        image.buffer,
      );

      const normalizedFile: Express.Multer.File = {
        ...image,
        buffer,
        mimetype,
        originalname: image.originalname.replace(
          /\.(jpe?g|png|jfif|webp)$/i,
          '.webp',
        ),
      };

      const uploaded = await this.cloudinaryService.uploadImage(
        normalizedFile,
        'reports',
      );

      imageUrl = uploaded.secure_url as string;
      imagePublicId = uploaded.public_id as string;
    }

    await this.db.insert(reports).values({
      userId,
      latitude,
      longitude,
      severity,
      description,
      range,
      image: imageUrl,
      imagePublicId,
      location: locationName,
      status: 'verified', // Admin-created reports are auto-verified
    });

    return { message: 'Report created and verified successfully' };
  }

  async verifyReportStatus(id: string) {
    const report = await this.db
      .select()
      .from(reports)
      .where(eq(reports.id, id))
      .limit(1);

    if (!report.length) {
      throw new NotFoundException('Report not found');
    }

    await this.db
      .update(reports)
      .set({ status: 'verified', updatedAt: new Date() })
      .where(eq(reports.id, id));

    return { message: 'Report verified successfully' };
  }

  async deleteReport(id: string) {
    const [report] = await this.db
      .select()
      .from(reports)
      .where(eq(reports.id, id))
      .limit(1);

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    // Delete image from Cloudinary if exists
    if (report.imagePublicId) {
      await this.cloudinaryService.deleteImage(report.imagePublicId);
    }

    await this.db.delete(reports).where(eq(reports.id, id));

    return { message: 'Report deleted successfully' };
  }
}

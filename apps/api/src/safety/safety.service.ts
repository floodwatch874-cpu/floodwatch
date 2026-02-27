import { Inject, Injectable } from '@nestjs/common';
import {
  CreateSafetyLocationInput,
  SafetyLocationQueryDto,
} from '@repo/schemas';
import { and, count, desc, eq, like, or, sql } from 'drizzle-orm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { DRIZZLE } from 'src/drizzle/drizzle-connection';
import { safety } from 'src/drizzle/schemas';
import { type DrizzleDB } from 'src/drizzle/types/drizzle';
import { GeocoderService } from 'src/geocoder/geocoder.service';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class SafetyService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private imagesService: ImagesService,
    private cloudinaryService: CloudinaryService,
    private geocoderService: GeocoderService,
  ) {}

  async findAllPublic() {
    return await this.db
      .select({
        id: safety.id,
        location: safety.location,
        address: safety.address,
        description: safety.description,
        latitude: safety.latitude,
        longitude: safety.longitude,
        type: safety.type,
        image: safety.image,
        createdAt: safety.createdAt,
      })
      .from(safety)
      .orderBy(desc(safety.createdAt));
  }

  async findAll(safetyLocationQuery: SafetyLocationQueryDto) {
    const { page, limit, type, q } = safetyLocationQuery;

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const offset = (pageNumber - 1) * limitNumber;

    // Build search condition once, reused across all queries
    const searchCondition = q
      ? or(like(safety.location, `%${q}%`), like(safety.address, `%${q}%`))
      : undefined;

    const whereClause =
      type && searchCondition
        ? and(eq(safety.type, type), searchCondition)
        : type
          ? eq(safety.type, type)
          : searchCondition;

    const [data, counts, statsResult] = await Promise.all([
      this.db
        .select()
        .from(safety)
        .where(whereClause)
        .limit(limitNumber)
        .offset(offset),

      this.db.select({ total: count() }).from(safety).where(whereClause),

      this.db
        .select({
          totalCount: count(),
          shelterCount: sql<number>`COUNT(*) FILTER (WHERE ${safety.type} = 'shelter')`,
          hospitalCount: sql<number>`COUNT(*) FILTER (WHERE ${safety.type} = 'hospital')`,
        })
        .from(safety)
        .where(searchCondition),
    ]);

    const { total } = counts[0];
    const { totalCount, shelterCount, hospitalCount } = statsResult[0];

    const formattedData = data.map((item) => ({
      id: item.id,
      location: item.location,
      address: item.address,
      description: item.description,
      latitude: item.latitude,
      longitude: item.longitude,
      type: item.type,
      image: item.image,
      createdAt: item.createdAt,
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
        shelterCount,
        hospitalCount,
        totalCount,
      },
    };
  }

  async createSafetyLocation(
    safetyLocationDto: CreateSafetyLocationInput,
    image: Express.Multer.File,
  ) {
    const { latitude, longitude, type, description, address, locationName } =
      safetyLocationDto;

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
        'safety',
      );

      imageUrl = uploaded.secure_url as string;
      imagePublicId = uploaded.public_id as string;
    }

    await this.db.insert(safety).values({
      latitude,
      longitude,
      type,
      description,
      image: imageUrl,
      imagePublicId,
      location: locationName,
      address,
    });
  }
}

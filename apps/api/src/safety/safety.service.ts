import { Inject, Injectable } from '@nestjs/common';
import { CreateSafetyLocationInput } from '@repo/schemas';
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

  async createSafetyLocation(
    userId: number,
    createSafetyLocationDto: CreateSafetyLocationInput,
    image: Express.Multer.File,
  ) {
    const { latitude, longitude, type, description } = createSafetyLocationDto;

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

    const displayName = await this.geocoderService.reverseGeocode(
      latitude,
      longitude,
    );

    await this.db.insert(safety).values({
      userId,
      latitude,
      longitude,
      type,
      description,
      image: imageUrl,
      imagePublicId,
      location: displayName,
    });
  }
}

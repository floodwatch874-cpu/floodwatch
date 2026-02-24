import { Module } from '@nestjs/common';
import { SafetyController } from './safety.controller';
import { SafetyService } from './safety.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { ImagesModule } from 'src/images/images.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { GeocoderModule } from 'src/geocoder/geocoder.module';

@Module({
  imports: [DrizzleModule, ImagesModule, CloudinaryModule, GeocoderModule],
  controllers: [SafetyController],
  providers: [SafetyService],
})
export class SafetyModule {}

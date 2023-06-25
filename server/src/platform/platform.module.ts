import { Module } from '@nestjs/common';
import { PlatformController } from './platform.controller';
import { PlatformService } from './platform.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlatformSchema } from './schema/platform.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Platform', schema: PlatformSchema }]),],
  controllers: [PlatformController],
  providers: [PlatformService]
})
export class PlatformModule {}

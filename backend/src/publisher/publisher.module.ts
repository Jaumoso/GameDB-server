import { Module } from '@nestjs/common';
import { PublisherController } from './publisher.controller';
import { PublisherService } from './publisher.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PublisherSchema } from './schema/publisher.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Publisher', schema: PublisherSchema }]),],
  controllers: [PublisherController],
  providers: [PublisherService]
})
export class PublisherModule {}

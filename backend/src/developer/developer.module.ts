import { Module } from '@nestjs/common';
import { DeveloperController } from './developer.controller';
import { DeveloperService } from './developer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DeveloperSchema } from './schema/developer.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Developer', schema: DeveloperSchema }]),],
  controllers: [DeveloperController],
  providers: [DeveloperService]
})
export class DeveloperModule {}

import { Module } from '@nestjs/common';
import { DlcController } from './dlc.controller';
import { DlcService } from './dlc.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DlcSchema } from './schema/dlc.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Dlc', schema: DlcSchema }]),],
  controllers: [DlcController],
  providers: [DlcService]
})
export class DlcModule {}

import { Module } from '@nestjs/common';
import { FranchiseController } from './franchise.controller';
import { FranchiseService } from './franchise.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FranchiseSchema } from './schema/franchise.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Franchise', schema: FranchiseSchema }]),],
  controllers: [FranchiseController],
  providers: [FranchiseService]
})
export class FranchiseModule {}

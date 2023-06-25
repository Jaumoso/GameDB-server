import { PartialType } from '@nestjs/swagger';
import { CreateFranchiseDto } from './createFranchise.dto';
export class UpdateFranchiseDto extends PartialType(CreateFranchiseDto) {}
import { PartialType } from '@nestjs/swagger';
import { CreateStorefrontDto } from './createStorefront.dto';
export class UpdateStorefrontDto extends PartialType(CreateStorefrontDto) {}
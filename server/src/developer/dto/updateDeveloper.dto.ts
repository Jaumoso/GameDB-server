import { PartialType } from '@nestjs/swagger';
import { CreateDeveloperDto } from './createDeveloper.dto';
export class UpdateDeveloperDto extends PartialType(CreateDeveloperDto) {}
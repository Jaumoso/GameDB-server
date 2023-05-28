import { PartialType } from '@nestjs/swagger';
import { CreateDlcDto } from './createDlc.dto';
export class UpdateDlcDto extends PartialType(CreateDlcDto) {}
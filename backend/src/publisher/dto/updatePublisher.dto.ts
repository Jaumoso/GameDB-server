import { PartialType } from '@nestjs/swagger';
import { CreatePublisherDto } from './createPublisher.dto';
export class UpdatePublisherDto extends PartialType(CreatePublisherDto) {}
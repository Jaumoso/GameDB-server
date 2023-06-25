import { PartialType } from '@nestjs/swagger';
import { CreateGenreDto } from './createGenre.dto';
export class UpdateGenreDto extends PartialType(CreateGenreDto) {}
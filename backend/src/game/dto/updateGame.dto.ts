import { PartialType } from '@nestjs/swagger';
import { CreateGameDto } from './createGame.dto';
export class UpdateGameDto extends PartialType(CreateGameDto) {}
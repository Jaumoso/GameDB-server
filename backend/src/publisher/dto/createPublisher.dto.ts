import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePublisherDto {

    @ApiProperty({
        type: String, 
        description: 'Nombre de la editora.',
        example: "name"
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        type: String, 
        description: 'Descripción de la editora.',
        example: "description"
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        type: String, 
        description: 'Imagen de la editora.',
        example: "assets/image.jpg"
    })
    @IsNotEmpty()
    @IsString()
    image: string;
}
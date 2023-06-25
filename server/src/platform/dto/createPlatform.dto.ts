import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePlatformDto {

    @ApiProperty({
        type: String, 
        description: 'Título de la plataforma.',
        example: "title"
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        type: String, 
        description: 'Descripción de la plataforma',
        example: 'description'
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        type: String, 
        description: 'Imagen de la plataforma',
        example: 'assets/image/platform.jpg'
    })
    @IsString()
    @IsNotEmpty()
    image: string;
}
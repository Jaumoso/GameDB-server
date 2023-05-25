import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDeveloperDto {

    @ApiProperty({
        type: String, 
        description: 'Nombre del desarrollador.',
        example: "name"
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        type: String, 
        description: 'Descripción del desarrollador.',
        example: "description"
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        type: String, 
        description: 'Imagen del desarrollador.',
        example: "assets/image.jpg"
    })
    @IsNotEmpty()
    @IsString()
    image: string;
}
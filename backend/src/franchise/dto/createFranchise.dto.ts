import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateFranchiseDto {

    @ApiProperty({
        type: String, 
        description: 'Título de la franquicia.',
        example: "title"
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        type: String, 
        description: 'Descripción de la franquicia.',
        example: 'description'
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        type: String, 
        description: 'Imagen de la franquicia.',
        example: 'assets/image.jpg'
    })
    @IsString()
    image: string;
}
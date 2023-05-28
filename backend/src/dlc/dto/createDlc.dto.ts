import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateDlcDto {

    @ApiProperty({
        type: String, 
        description: 'Título del DLC.',
        example: "title"
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        type: String, 
        description: 'Descripción del DLC.',
        example: 'description'
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        type: String, 
        description: 'Imagen del DLC.',
        example: 'assets/imagen.jpg'
    })
    @IsString()
    image: string;

    @ApiProperty({
        type: Date, 
        description: 'Fecha de salida del DLC.',
        example: new Date(2023, 1, 15).toISOString()
    })
    @IsString()
    @IsNotEmpty()
    released: Date;
}
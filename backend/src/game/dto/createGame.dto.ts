import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateGameDto {

    @ApiProperty({
        type: String, 
        description: 'Título del juego.',
        example: "title"
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        type: String, 
        description: 'Descripción del juego.',
        example: 'description'
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        type: String, 
        description: 'Imagen del juego.',
        example: 'assets/imagen.jpg'
    })
    @IsString()
    image: string;

    @ApiProperty({
        type: Date, 
        description: 'Fecha de salida del juego.',
        example: new Date(2023, 1, 15).toISOString()
    })
    @IsDate()
    @IsNotEmpty()
    released: Date;

    @ApiProperty({
        type: mongoose.Types.ObjectId, 
        description: 'Desarrollador del juego.',
        example: new mongoose.Types.ObjectId()
    })
    @IsNotEmpty()
    developer: mongoose.Types.ObjectId;

    @ApiProperty({
        type: mongoose.Types.ObjectId,
        description: 'Editora del juego.',
        example: new mongoose.Types.ObjectId()
    })
    @IsNotEmpty()
    publisher: mongoose.Types.ObjectId;

    @ApiProperty({
        type: String,
        description: 'Género del juego.',
        example: 'genre'
    })
    @IsString()
    genre: string[];
    
    @ApiProperty({
        type: String, 
        description: 'Franquicia del juego.',
        example: 'franchise'
    })
    @IsString()
    franchise: string[];

    @ApiProperty({
        type: String, 
        description: 'Plataforma del juego.',
        example: 'franchise'
    })
    platform: string[];
}
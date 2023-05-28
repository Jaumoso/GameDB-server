import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateGenreDto {

    @ApiProperty({
        type: String, 
        description: 'Título del género.',
        example: "title"
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        type: String, 
        description: 'Descripción del género.',
        example: 'description'
    })
    @IsString()
    @IsNotEmpty()
    description: string;
}
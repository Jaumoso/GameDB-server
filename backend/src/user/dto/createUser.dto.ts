import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import mongoose from "mongoose";

export class CreateUserDto {

    @ApiProperty({
        type: String, 
        description: 'Nickname del usuario. Este campo es obligatorio.',
        example: "nombre por defecto"
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(30)
    username: string;

    @ApiProperty({
        type: String, 
        description: 'Contraseña del usuario. Este campo es obligatorio.',
        example: 'password'
    })
    @MinLength(8)
    @IsString()
    @IsNotEmpty()
    password: string;

/*     @ApiProperty({
        type: String, 
        description: 'Imágen de perfil del usuario.',
        example: 'assets/profilepic.png'
    })
    @IsString()
    profilePic: string; */

    @ApiProperty({
        type: Date,
        description: 'Fecha de entrada del usuario en la página.',
        example: new Date(2023, 5, 27).toISOString()
    })
    @IsString()
    @IsNotEmpty()
    joined: Date;

    @ApiProperty({
        type: Date,
        description: 'Última fecha en la que el usuario se ha conectado.',
        example: new Date(2023, 5, 27).toISOString()
    })
    @IsString()
    @IsNotEmpty()
    lastSeen: Date;

    @ApiProperty({
        type: mongoose.Types.ObjectId,
        description: 'Array de IDs de los juegos',
        example: [new mongoose.Types.ObjectId()]
    })
    @IsNotEmpty()
    library: mongoose.Types.ObjectId[];


}
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
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
    @IsNotEmpty()
    joined: Date;

    @ApiProperty({
        type: Date,
        description: 'Última fecha en la que el usuario se ha conectado.',
        example: new Date(2023, 5, 27).toISOString()
    })
    @IsNotEmpty()
    lastSeen: Date;

    @ApiProperty({
        description: 'Array de juegos y sus ratings',
        example: [{ 
            _id: new mongoose.Types.ObjectId(),
            gameId: 12345,
            name: "default name",
            releaseDate: new Date(2018, 5, 15).toISOString(),
            cover: "https://cover.png",
            rating: 8,
            platforms: ['PC'],
            storefronts: ['Steam'],
            acquisitionDate: new Date(2023, 8, 1).toISOString(),
            acquisitionPrice: 0,
            own: true,
            format: 'digital',
            state: 'Not Interested',
            time: 152.5,
            comment: 'Default comment.'
        }],
    })
    library: {
        _id: mongoose.Types.ObjectId,
        gameId: number,
        name: string,
        releaseDate: Date,
        cover: string,
        rating: number,
        platforms?: string[],
        storefronts?: string[],
        acquisitionDate?: Date,
        acquisitionPrice?: number,
        own: boolean,
        format: string,
        state: string,
        time: number,
        comment: string
    }[];
    
}
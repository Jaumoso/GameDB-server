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
        enum: () => [{ gameId: mongoose.Types.ObjectId, rating: Number }],
        description: 'Array de juegos y sus ratings',
        example: [{ 
            gameId: 12345,
            rating: 8,
            platform: ['Steam'],
            storefront: [new mongoose.Types.ObjectId()],
            acquisitionDate: new Date(2023, 8, 1).toISOString(),
            acquisitionPrice: 0,
            own: true,
            state: 'Not Interested'
        }],
    })
    library: {
        gameId: number,
        rating: number,
        platform: string[],
        storefront: mongoose.Types.ObjectId[],
        acquisitionDate: Date,
        acquisitionPrice: number,
        own: boolean,
        state: string,
    }[];
    
}
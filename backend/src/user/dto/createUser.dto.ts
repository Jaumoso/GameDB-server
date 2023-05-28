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
        enum: () => [{ gameId: mongoose.Types.ObjectId, rating: Number }],
        description: 'Array de juegos y sus ratings',
        example: [{ 
            gameId: new mongoose.Types.ObjectId(), 
            rating: 8,
            platform: [new mongoose.Types.ObjectId()],
            state: 0
        }],
    })
    library: {
        gameId: mongoose.Types.ObjectId; 
        rating: Number;
        platform: mongoose.Types.ObjectId[];
        own: boolean;
        state: Number;
        // 0 Not interested
        // 1 Want to play
        // 2 Playing
        // 3 Infinite
        // 4 Abandoned
        // 5 Played
        // 6 Completed
        // 7 Wishlist
    }[];
    
}
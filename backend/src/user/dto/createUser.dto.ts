import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

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

    @IsString()
    profilePic: string;

    @IsDate()
    @IsNotEmpty()
    joined: Date;

    @IsDate()
    @IsNotEmpty()
    lastSeen: Date;
}
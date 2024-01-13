import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findUser(username);
        if (!user) {
            throw new NotAcceptableException("Couldn't find the user");
        }

        const passwordValid = await bcrypt.compare(password, user.password)
        
        // Devuelve el usuario sin username, password ni email
        if (passwordValid) {
            const { password, ... rest } = user;
            return rest;
        }
        else{
            throw new NotAcceptableException('Invalid password');
        }
    }

    async login(user: any) {
        const payload = { 
            _id: user._id,
            username: user.username,
            password: user.password,
            joined: user.joined,
            lastSeen: user.lastSeen
        };
        return {
            access_token: this.jwtService.sign(payload, {
                algorithm: 'HS256',
                secret: process.env.JWT_SECRET,
                //expiresIn: '120m' // duración de la sesión. Cada 2 horas se necesita iniciar sesión de nuevo
            })
        };
    }
}
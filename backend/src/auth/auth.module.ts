import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schema/user.schema';

@Module({
  imports: [
    UserModule, 
    PassportModule,
    JwtModule, 
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }
  ])
],
  controllers: [AuthController],
  providers: [AuthService,  UserService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}

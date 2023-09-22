import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { StorefrontModule } from './storefront/storefront.module';
import { IgdbModule } from './igdb/igdb.module';
require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot('mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@gamedb.7nyx86b.mongodb.net/',{dbName: 'GameDB'}),
    UserModule,
    AuthModule,
    StorefrontModule,
    GameModule,
    IgdbModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

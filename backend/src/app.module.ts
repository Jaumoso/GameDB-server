import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { DeveloperModule } from './developer/developer.module';
import { PublisherModule } from './publisher/publisher.module';
import { FranchiseModule } from './franchise/franchise.module';
import { PlatformModule } from './platform/platform.module';
import { GenreModule } from './genre/genre.module';
import { DlcModule } from './dlc/dlc.module';

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
    GameModule,
    DeveloperModule,
    PublisherModule,
    FranchiseModule,
    PlatformModule,
    GenreModule,
    DlcModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

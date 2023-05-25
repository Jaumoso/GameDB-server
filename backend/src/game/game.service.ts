import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GameDocument } from './schema/game.schema';
import { CreateGameDto } from './dto/createGame.dto';
import { UpdateGameDto } from './dto/updateGame.dto';

@Injectable()
export class GameService {
    constructor(@InjectModel('Game') private gameModel:Model<GameDocument>) { }

    async getAllGames(): Promise<GameDocument[]> {
        const gameData = await this.gameModel.find()
        if (!gameData || gameData.length == 0) {
            throw new NotFoundException('Game data not found!');
        }
        return gameData;
    }

    async getGame(gameId: string): Promise<GameDocument> {
        const gameData = await this.gameModel.findById(gameId);
        if (!gameData) {
            throw new NotFoundException('Game data not found!');
        }
        return gameData;
    }

    async createGame(gameDto: CreateGameDto ): Promise<GameDocument> {
        const newGame = await this.gameModel.create(gameDto);
        if (!newGame) {
            throw new NotFoundException('Could not create game!');
        }
        return newGame;
    }

    async updateGame(gameId: string, updateGameDto: UpdateGameDto) {
        const updatedGame = await this.gameModel.findByIdAndUpdate(gameId, updateGameDto);
        if (!updatedGame) {
            throw new NotFoundException('Game data not found!');
        }
        return updatedGame;
    }

    async deleteGame(gameId: string): Promise<GameDocument> {
        const deletedGame = await this.gameModel.findByIdAndDelete(gameId);
        if (!deletedGame) {
            throw new NotFoundException(`Game #${gameId} not found`);
        }
        return deletedGame;
    }
}

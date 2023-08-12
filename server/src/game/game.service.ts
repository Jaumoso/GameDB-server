import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument } from './schema/game.schema';
import { CreateGameDto } from './dto/createGame.dto';
import { UpdateGameDto } from './dto/updateGame.dto';
import axios from 'axios';
import { IgdbService } from 'src/igdb/igdb.service';

export const apiAuth = {
    useFactory: async (igdbService: IgdbService) => {
      return await igdbService.getIgdbToken();
    },
    inject: [IgdbService]
}

@Injectable()
export class GameService {
    constructor(@InjectModel('Game') private gameModel:Model<GameDocument>) { }

    // async getAllGames(): Promise<GameDocument[]> {
    //     const gameData = await this.gameModel.find()
    //     if (!gameData || gameData.length == 0) {
    //         throw new NotFoundException('Game data not found!');
    //     }
    //     return gameData;
    // }

    // async getGame(gameId: string): Promise<GameDocument> {
    //     const gameData = await this.gameModel.findById(gameId);
    //     if (!gameData) {
    //         throw new NotFoundException('Game data not found!');
    //     }
    //     return gameData;
    // }

    async gameSearch(searchGameTitle: string): Promise<any[]> {
        let searchResult = null;
        let games: any[] = [];
        try {
            const igdbService = new IgdbService();
            const accessToken = await apiAuth.useFactory(igdbService);
            const response = await axios({
                method: 'post',
                url: 'https://api.igdb.com/v4/games',
                headers: {
                   'Client-ID': process.env.IGDB_CLIENT_ID,
                   Authorization: 'Bearer ' + accessToken,
                   Accept: 'application/json'
                }, 
                data: `search "${searchGameTitle}"; limit 20; fields name,first_release_date,cover.image_id,platforms.name;`
              });
              console.log(response.data)
              searchResult = response.data;
        } catch (error) {
            console.log(error);
        }

        try {
            searchResult.forEach((game: { id: any; name: any; first_release_date: number; cover: any; platforms: any; }) => {
                games.push({
                    id: game.id,
                    name: game.name,
                    first_release_date: game.first_release_date * 1000,
                    cover: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover?.image_id}.jpg`,
                    platforms: game.platforms
                });
            })
            console.log(games);
        } catch (error) {
            console.log(error);
        }
        return games;
    }

    async getGamesByIds(gameIds: Number[]): Promise<any[]> {
        let searchResult = null;
        let games: any[] = [];
        let gameIdsArray = gameIds.join(',');
        try {
            const igdbService = new IgdbService();
            const accessToken = await apiAuth.useFactory(igdbService);
            const response = await axios({
                method: 'post',
                url: 'https://api.igdb.com/v4/games',
                headers: {
                   'Client-ID': process.env.IGDB_CLIENT_ID,
                   Authorization: 'Bearer ' + accessToken,
                   Accept: 'application/json'
                }, 
                data: `fields name,first_release_date,cover.image_id; where id = (${gameIdsArray});`
              });
              console.log(response.data)
              searchResult = response.data;
        } catch (error) {
            console.log(error);
        }

        try {
            searchResult.forEach((game) => {
                games.push({
                    id: game.id,
                    name: game.name,
                    first_release_date: game.first_release_date * 1000,
                    cover: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover?.image_id}.jpg`,
                });
            })
            console.log(games);
        } catch (error) {
            console.log(error);
        }
        return games;
    }

    // async createGame(gameDto: CreateGameDto ): Promise<GameDocument> {
    //     const newGame = await this.gameModel.create(gameDto);
    //     if (!newGame) {
    //         throw new NotFoundException('Could not create game!');
    //     }
    //     return newGame;
    // }

    // async updateGame(gameId: string, updateGameDto: UpdateGameDto) {
    //     const updatedGame = await this.gameModel.findByIdAndUpdate(gameId, updateGameDto);
    //     if (!updatedGame) {
    //         throw new NotFoundException('Game data not found!');
    //     }
    //     return updatedGame;
    // }

    // async deleteGame(gameId: string): Promise<GameDocument> {
    //     const deletedGame = await this.gameModel.findByIdAndDelete(gameId);
    //     if (!deletedGame) {
    //         throw new NotFoundException(`Game #${gameId} not found`);
    //     }
    //     return deletedGame;
    // }
}

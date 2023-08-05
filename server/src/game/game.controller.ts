import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/createGame.dto';
import { UpdateGameDto } from './dto/updateGame.dto';

@ApiTags('Game')
@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) { }
    
    @Get('/search/:gameTitleSearch')
    @ApiCreatedResponse({ description: 'Información de un juego en concreto.' })
    async searchGames(@Res() response, @Param('gameTitleSearch') gameTitleSearch: string) {
        try {
            const gameData = await this.gameService.searchGames(gameTitleSearch);
            return response.status(HttpStatus.OK).json({
                message: 'Game data found successfully', gameData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get()
    @ApiCreatedResponse({ description: 'Toda la información de los juegos.' })
    async getAllGames(@Res() response) {
        try {
            const gameData = await this.gameService.getAllGames();
            return response.status(HttpStatus.OK).json({
                message: 'All game data found successfully', gameData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get(':id')
    @ApiCreatedResponse({ description: 'Información de un juego en concreto.' })
    async getGame(@Res() response, @Param('id') gameId: string) {
        try {
            const gameData = await this.gameService.getGame(gameId);
            return response.status(HttpStatus.OK).json({
                message: 'Game data found successfully', gameData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Post('new')
    @ApiCreatedResponse({ description: 'Creación de un nuevo juego.' })
    async createGame(@Res() response, @Body() createGameDto: CreateGameDto) {
        try {
            const newGame = await this.gameService.createGame(createGameDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Game has been created successfully', newGame,
            });
        }
        catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Game not created!',
                error: 'Bad Request'
            });
        }
    }

    @Put('update/:id')
    @ApiCreatedResponse({ description: 'Actualiza un juego.' })
    async updateGame(@Res() response, @Param('id') gameId: string, @Body() updateGameDto: UpdateGameDto) {
        try {
            const updatedGame = await this.gameService.updateGame(gameId, updateGameDto);
            return response.status(HttpStatus.OK).json({
                message: 'Game has been successfully updated',
                updatedGame,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('delete/:id')
    @ApiCreatedResponse({ description: 'Borra un juego.' })
    async deleteGame(@Res() response, @Param('id') gameId: string) {
        try {
            const deletedUser = await this.gameService.deleteGame(gameId);
            return response.status(HttpStatus.OK).json({
                message: 'Game deleted successfully',
                deletedUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}

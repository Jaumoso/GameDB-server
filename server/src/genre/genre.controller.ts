import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateGenreDto } from './dto/createGenre.dto';
import { UpdateGenreDto } from './dto/updateGenre.dto';
import { GenreService } from './genre.service';

@ApiTags('Genre')
@Controller('genre')
export class GenreController {
    constructor(private readonly genreService: GenreService) { }
    
    @Get()
    @ApiCreatedResponse({ description: 'Toda la información de los generos.' })
    async getAllGenres(@Res() response) {
        try {
            const genreData = await this.genreService.getAllGenres();
            return response.status(HttpStatus.OK).json({
                message: 'All genre data found successfully', genreData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get(':id')
    @ApiCreatedResponse({ description: 'Información de un género en concreto.' })
    async getGenre(@Res() response, @Param('id') genreId: string) {
        try {
            const genreData = await this.genreService.getGenre(genreId);
            return response.status(HttpStatus.OK).json({
                message: 'Genre data found successfully', genreData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Post('new')
    @ApiCreatedResponse({ description: 'Creación de un nuevo género.' })
    async createGenre(@Res() response, @Body() createGenreDto: CreateGenreDto) {
        try {
            const newGenre = await this.genreService.createGenre(createGenreDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Genre has been created successfully', newGenre,
            });
        }
        catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Genre not created!',
                error: 'Bad Request'
            });
        }
    }

    @Put('update/:id')
    @ApiCreatedResponse({ description: 'Actualiza un género.' })
    async updateGenre(@Res() response, @Param('id') genreId: string, @Body() updateGenreDto: UpdateGenreDto) {
        try {
            const updatedGenre = await this.genreService.updateGenre(genreId, updateGenreDto);
            return response.status(HttpStatus.OK).json({
                message: 'Genre has been successfully updated',
                updatedGenre,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('delete/:id')
    @ApiCreatedResponse({ description: 'Borra un género.' })
    async deleteGenre(@Res() response, @Param('id') genreId: string) {
        try {
            const deletedUser = await this.genreService.deleteGenre(genreId);
            return response.status(HttpStatus.OK).json({
                message: 'Genre deleted successfully',
                deletedUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}

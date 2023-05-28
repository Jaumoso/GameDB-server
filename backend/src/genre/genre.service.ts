import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateGenreDto } from './dto/createGenre.dto';
import { GenreDocument } from './schema/genre.schema';
import { UpdateGenreDto } from './dto/updateGenre.dto';
import { Model } from 'mongoose';

@Injectable()
export class GenreService {
    constructor(@InjectModel('Genre') private genreModel:Model<GenreDocument>) { }

    async getAllGenres(): Promise<GenreDocument[]> {
        const genreData = await this.genreModel.find()
        if (!genreData || genreData.length == 0) {
            throw new NotFoundException('Genre data not found!');
        }
        return genreData;
    }

    async getGenre(genreId: string): Promise<GenreDocument> {
        const genreData = await this.genreModel.findById(genreId);
        if (!genreData) {
            throw new NotFoundException('Genre data not found!');
        }
        return genreData;
    }

    async createGenre(genreDto: CreateGenreDto ): Promise<GenreDocument> {
        const newGenre = await this.genreModel.create(genreDto);
        if (!newGenre) {
            throw new NotFoundException('Could not create genre!');
        }
        return newGenre;
    }

    async updateGenre(genreId: string, updateGenreDto: UpdateGenreDto) {
        const updatedGenre = await this.genreModel.findByIdAndUpdate(genreId, updateGenreDto);
        if (!updatedGenre) {
            throw new NotFoundException('Genre data not found!');
        }
        return updatedGenre;
    }

    async deleteGenre(genreId: string): Promise<GenreDocument> {
        const deletedGenre = await this.genreModel.findByIdAndDelete(genreId);
        if (!deletedGenre) {
            throw new NotFoundException(`Genre #${genreId} not found`);
        }
        return deletedGenre;
    }
}

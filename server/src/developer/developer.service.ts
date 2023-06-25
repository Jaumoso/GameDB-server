import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeveloperDto } from './dto/createDeveloper.dto';
import { DeveloperDocument } from './schema/developer.schema';
import { UpdateDeveloperDto } from './dto/updateDeveloper.dto';

@Injectable()
export class DeveloperService {
    constructor(@InjectModel('Developer') private developerModel:Model<DeveloperDocument>) { }

    async getAllDevelopers(): Promise<DeveloperDocument[]> {
        const developerData = await this.developerModel.find()
        if (!developerData || developerData.length == 0) {
            throw new NotFoundException('Developer data not found!');
        }
        return developerData;
    }

    async getDeveloper(developerId: string): Promise<DeveloperDocument> {
        const developerData = await this.developerModel.findById(developerId);
        if (!developerData) {
            throw new NotFoundException('Developer data not found!');
        }
        return developerData;
    }

    async createDeveloper(developerDto: CreateDeveloperDto ): Promise<DeveloperDocument> {
        const newDeveloper = await this.developerModel.create(developerDto);
        if (!newDeveloper) {
            throw new NotFoundException('Could not create developer!');
        }
        return newDeveloper;
    }

    async updateDeveloper(developerId: string, updateDeveloperDto: UpdateDeveloperDto) {
        const updatedDeveloper = await this.developerModel.findByIdAndUpdate(developerId, updateDeveloperDto);
        if (!updatedDeveloper) {
            throw new NotFoundException('Developer data not found!');
        }
        return updatedDeveloper;
    }

    async deleteDeveloper(developerId: string): Promise<DeveloperDocument> {
        const deletedDeveloper = await this.developerModel.findByIdAndDelete(developerId);
        if (!deletedDeveloper) {
            throw new NotFoundException(`Developer #${developerId} not found`);
        }
        return deletedDeveloper;
    }
}

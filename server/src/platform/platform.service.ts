import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlatformDocument } from './schema/platform.schema';
import { UpdatePlatformDto } from './dto/updatePlatform.dto';
import { CreatePlatformDto } from './dto/createPlatform.dto';

@Injectable()
export class PlatformService {
    constructor(@InjectModel('Platform') private platformModel:Model<PlatformDocument>) { }

    async getAllPlatforms(): Promise<PlatformDocument[]> {
        const platformData = await this.platformModel.find()
        if (!platformData || platformData.length == 0) {
            throw new NotFoundException('Platform data not found!');
        }
        return platformData;
    }

    async getPlatform(platformId: string): Promise<PlatformDocument> {
        const platformData = await this.platformModel.findById(platformId);
        if (!platformData) {
            throw new NotFoundException('Platform data not found!');
        }
        return platformData;
    }

    async createPlatform(platformDto: CreatePlatformDto ): Promise<PlatformDocument> {
        const newPlatform = await this.platformModel.create(platformDto);
        if (!newPlatform) {
            throw new NotFoundException('Could not create platform!');
        }
        return newPlatform;
    }

    async updatePlatform(platformId: string, updatePlatformDto: UpdatePlatformDto) {
        const updatedPlatform = await this.platformModel.findByIdAndUpdate(platformId, updatePlatformDto);
        if (!updatedPlatform) {
            throw new NotFoundException('Platform data not found!');
        }
        return updatedPlatform;
    }

    async deletePlatform(platformId: string): Promise<PlatformDocument> {
        const deletedPlatform = await this.platformModel.findByIdAndDelete(platformId);
        if (!deletedPlatform) {
            throw new NotFoundException(`Platform #${platformId} not found`);
        }
        return deletedPlatform;
    }
}

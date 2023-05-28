import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFranchiseDto } from './dto/createFranchise.dto';
import { UpdateFranchiseDto } from './dto/updateFranchise.dto';
import { FranchiseDocument } from './schema/franchise.schema';
import { Model } from 'mongoose';

@Injectable()
export class FranchiseService {
    constructor(@InjectModel('Franchise') private franchiseModel:Model<FranchiseDocument>) { }

    async getAllFranchises(): Promise<FranchiseDocument[]> {
        const franchiseData = await this.franchiseModel.find()
        if (!franchiseData || franchiseData.length == 0) {
            throw new NotFoundException('Franchise data not found!');
        }
        return franchiseData;
    }

    async getFranchise(franchiseId: string): Promise<FranchiseDocument> {
        const franchiseData = await this.franchiseModel.findById(franchiseId);
        if (!franchiseData) {
            throw new NotFoundException('Franchise data not found!');
        }
        return franchiseData;
    }

    async createFranchise(franchiseDto: CreateFranchiseDto ): Promise<FranchiseDocument> {
        const newFranchise = await this.franchiseModel.create(franchiseDto);
        if (!newFranchise) {
            throw new NotFoundException('Could not create franchise!');
        }
        return newFranchise;
    }

    async updateFranchise(franchiseId: string, updateFranchiseDto: UpdateFranchiseDto) {
        const updatedFranchise = await this.franchiseModel.findByIdAndUpdate(franchiseId, updateFranchiseDto);
        if (!updatedFranchise) {
            throw new NotFoundException('Franchise data not found!');
        }
        return updatedFranchise;
    }

    async deleteFranchise(franchiseId: string): Promise<FranchiseDocument> {
        const deletedFranchise = await this.franchiseModel.findByIdAndDelete(franchiseId);
        if (!deletedFranchise) {
            throw new NotFoundException(`Franchise #${franchiseId} not found`);
        }
        return deletedFranchise;
    }
}

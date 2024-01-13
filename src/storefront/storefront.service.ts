import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StorefrontDocument } from './schema/storefront.schema';
import { CreateStorefrontDto } from './dto/createStorefront.dto';
import { UpdateStorefrontDto } from './dto/updateStorefront.dto';

@Injectable()
export class StorefrontService {
    constructor(@InjectModel('Storefront') private storefrontModel:Model<StorefrontDocument>) { }

    async getAllStorefronts(): Promise<StorefrontDocument[]> {
        const storefrontData = await this.storefrontModel.find()
        if (!storefrontData || storefrontData.length == 0) {
            throw new NotFoundException('Storefront data not found!');
        }
        return storefrontData;
    }

    async getStorefront(storefrontId: string): Promise<StorefrontDocument> {
        const storefrontData = await this.storefrontModel.findById(storefrontId);
        if (!storefrontData) {
            throw new NotFoundException('Storefront data not found!');
        }
        return storefrontData;
    }

    async createStorefront(storefrontDto: CreateStorefrontDto ): Promise<StorefrontDocument> {
        const newStorefront = await this.storefrontModel.create(storefrontDto);
        if (!newStorefront) {
            throw new NotFoundException('Could not create storefront!');
        }
        return newStorefront;
    }

    async updateStorefront(storefrontId: string, updateStorefrontDto: UpdateStorefrontDto) {
        const updatedStorefront = await this.storefrontModel.findByIdAndUpdate(storefrontId, updateStorefrontDto);
        if (!updatedStorefront) {
            throw new NotFoundException('Storefront data not found!');
        }
        return updatedStorefront;
    }

    async deleteStorefront(storefrontId: string): Promise<StorefrontDocument> {
        const deletedStorefront = await this.storefrontModel.findByIdAndDelete(storefrontId);
        if (!deletedStorefront) {
            throw new NotFoundException(`Storefront #${storefrontId} not found`);
        }
        return deletedStorefront;
    }
}

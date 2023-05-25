import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PublisherDocument } from './schema/publisher.schema';
import { CreatePublisherDto } from './dto/createPublisher.dto';
import { UpdatePublisherDto } from './dto/updatePublisher.dto';

@Injectable()
export class PublisherService {
    constructor(@InjectModel('Publisher') private publisherModel:Model<PublisherDocument>) { }

    async getAllPublishers(): Promise<PublisherDocument[]> {
        const publisherData = await this.publisherModel.find()
        if (!publisherData || publisherData.length == 0) {
            throw new NotFoundException('Publisher data not found!');
        }
        return publisherData;
    }

    async getPublisher(publisherId: string): Promise<PublisherDocument> {
        const publisherData = await this.publisherModel.findById(publisherId);
        if (!publisherData) {
            throw new NotFoundException('Publisher data not found!');
        }
        return publisherData;
    }

    async createPublisher(publisherDto: CreatePublisherDto ): Promise<PublisherDocument> {
        const newPublisher = await this.publisherModel.create(publisherDto);
        if (!newPublisher) {
            throw new NotFoundException('Could not create publisher!');
        }
        return newPublisher;
    }

    async updatePublisher(publisherId: string, updatePublisherDto: UpdatePublisherDto) {
        const updatedPublisher = await this.publisherModel.findByIdAndUpdate(publisherId, updatePublisherDto);
        if (!updatedPublisher) {
            throw new NotFoundException('Publisher data not found!');
        }
        return updatedPublisher;
    }

    async deletePublisher(publisherId: string): Promise<PublisherDocument> {
        const deletedPublisher = await this.publisherModel.findByIdAndDelete(publisherId);
        if (!deletedPublisher) {
            throw new NotFoundException(`Publisher #${publisherId} not found`);
        }
        return deletedPublisher;
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDlcDto } from './dto/createDlc.dto';
import { UpdateDlcDto } from './dto/updateDlc.dto';
import { DlcDocument } from './schema/dlc.schema';

@Injectable()
export class DlcService {
    constructor(@InjectModel('Dlc') private dlcModel:Model<DlcDocument>) { }

    async getAllDlcs(): Promise<DlcDocument[]> {
        const dlcData = await this.dlcModel.find()
        if (!dlcData || dlcData.length == 0) {
            throw new NotFoundException('Dlc data not found!');
        }
        return dlcData;
    }

    async getDlc(dlcId: string): Promise<DlcDocument> {
        const dlcData = await this.dlcModel.findById(dlcId);
        if (!dlcData) {
            throw new NotFoundException('Dlc data not found!');
        }
        return dlcData;
    }

    async createDlc(dlcDto: CreateDlcDto ): Promise<DlcDocument> {
        const newDlc = await this.dlcModel.create(dlcDto);
        if (!newDlc) {
            throw new NotFoundException('Could not create dlc!');
        }
        return newDlc;
    }

    async updateDlc(dlcId: string, updateDlcDto: UpdateDlcDto) {
        const updatedDlc = await this.dlcModel.findByIdAndUpdate(dlcId, updateDlcDto);
        if (!updatedDlc) {
            throw new NotFoundException('Dlc data not found!');
        }
        return updatedDlc;
    }
    
    async deleteDlc(dlcId: string): Promise<DlcDocument> {
        const deletedDlc = await this.dlcModel.findByIdAndDelete(dlcId);
        if (!deletedDlc) {
            throw new NotFoundException(`Dlc #${dlcId} not found`);
        }
        return deletedDlc;
    }
}

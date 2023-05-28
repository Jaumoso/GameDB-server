import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { DlcService } from 'src/dlc/dlc.service';
import { UpdateDlcDto } from './dto/updateDlc.dto';
import { CreateDlcDto } from './dto/createDlc.dto';

@ApiTags('Dlc')
@Controller('dlc')
export class DlcController {
    constructor(private readonly dlcService: DlcService) { }

    @Get()
    @ApiCreatedResponse({ description: 'Toda la información de los dlc.' })
    async getAllDlcs(@Res() response) {
        try {
            const dlcData = await this.dlcService.getAllDlcs();
            return response.status(HttpStatus.OK).json({
                message: 'All dlc data found successfully', dlcData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get(':id')
    @ApiCreatedResponse({ description: 'Información de un dlc en concreto.' })
    async getDlc(@Res() response, @Param('id') dlcId: string) {
        try {
            const dlcData = await this.dlcService.getDlc(dlcId);
            return response.status(HttpStatus.OK).json({
                message: 'Dlc data found successfully', dlcData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Post('new')
    @ApiCreatedResponse({ description: 'Creación de un nuevo dlc.' })
    async createDlc(@Res() response, @Body() createDlcDto: CreateDlcDto) {
        try {
            const newDlc = await this.dlcService.createDlc(createDlcDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Dlc has been created successfully', newDlc,
            });
        }
        catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Dlc not created!',
                error: 'Bad Request'
            });
        }
    }

    @Put('update/:id')
    @ApiCreatedResponse({ description: 'Actualiza un dlc.' })
    async updateDlc(@Res() response, @Param('id') dlcId: string, @Body() updateDlcDto: UpdateDlcDto) {
        try {
            const updatedDlc = await this.dlcService.updateDlc(dlcId, updateDlcDto);
            return response.status(HttpStatus.OK).json({
                message: 'Dlc has been successfully updated',
                updatedDlc,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('delete/:id')
    @ApiCreatedResponse({ description: 'Borra un dlc.' })
    async deleteDlc(@Res() response, @Param('id') dlcId: string) {
        try {
            const deletedUser = await this.dlcService.deleteDlc(dlcId);
            return response.status(HttpStatus.OK).json({
                message: 'Dlc deleted successfully',
                deletedUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}

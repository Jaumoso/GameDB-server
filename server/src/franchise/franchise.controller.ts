import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateFranchiseDto } from './dto/createFranchise.dto';
import { UpdateFranchiseDto } from './dto/updateFranchise.dto';
import { FranchiseService } from './franchise.service';

@ApiTags('Franchise')
@Controller('franchise')
export class FranchiseController {
    constructor(private readonly franchiseService: FranchiseService) { }
    
    @Get()
    @ApiCreatedResponse({ description: 'Toda la información de las franquicias.' })
    async getAllFranchises(@Res() response) {
        try {
            const franchiseData = await this.franchiseService.getAllFranchises();
            return response.status(HttpStatus.OK).json({
                message: 'All franchise data found successfully', franchiseData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get(':id')
    @ApiCreatedResponse({ description: 'Información de una franquicia en concreto.' })
    async getFranchise(@Res() response, @Param('id') franchiseId: string) {
        try {
            const franchiseData = await this.franchiseService.getFranchise(franchiseId);
            return response.status(HttpStatus.OK).json({
                message: 'Franchise data found successfully', franchiseData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Post('new')
    @ApiCreatedResponse({ description: 'Creación de una nueva franquicia.' })
    async createFranchise(@Res() response, @Body() createFranchiseDto: CreateFranchiseDto) {
        try {
            const newFranchise = await this.franchiseService.createFranchise(createFranchiseDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Franchise has been created successfully', newFranchise,
            });
        }
        catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Franchise not created!',
                error: 'Bad Request'
            });
        }
    }

    @Put('update/:id')
    @ApiCreatedResponse({ description: 'Actualiza una franquicia.' })
    async updateFranchise(@Res() response, @Param('id') franchiseId: string, @Body() updateFranchiseDto: UpdateFranchiseDto) {
        try {
            const updatedFranchise = await this.franchiseService.updateFranchise(franchiseId, updateFranchiseDto);
            return response.status(HttpStatus.OK).json({
                message: 'Franchise has been successfully updated',
                updatedFranchise,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('delete/:id')
    @ApiCreatedResponse({ description: 'Borra una franquicia.' })
    async deleteFranchise(@Res() response, @Param('id') franchiseId: string) {
        try {
            const deletedUser = await this.franchiseService.deleteFranchise(franchiseId);
            return response.status(HttpStatus.OK).json({
                message: 'Franchise deleted successfully',
                deletedUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}

import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { DeveloperService } from './developer.service';
import { CreateDeveloperDto } from './dto/createDeveloper.dto';
import { UpdateDeveloperDto } from './dto/updateDeveloper.dto';

@ApiTags('Developer')
@Controller('developer')
export class DeveloperController {
    constructor(private readonly developerService: DeveloperService) { }

    @Get()
    @ApiCreatedResponse({ description: 'Toda la información de los developers.' })
    async getAllDevelopers(@Res() response) {
        try {
            const dçeveloperData = await this.developerService.getAllDevelopers();
            return response.status(HttpStatus.OK).json({
                message: 'All developer data found successfully', dçeveloperData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get(':id')
    @ApiCreatedResponse({ description: 'Información de un developer en concreto.' })
    async getDeveloper(@Res() response, @Param('id') dçeveloperId: string) {
        try {
            const dçeveloperData = await this.developerService.getDeveloper(dçeveloperId);
            return response.status(HttpStatus.OK).json({
                message: 'Developer data found successfully', dçeveloperData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Post('new')
    @ApiCreatedResponse({ description: 'Creación de un nuevo developer.' })
    async createDeveloper(@Res() response, @Body() createDeveloperDto: CreateDeveloperDto) {
        try {
            const newDeveloper = await this.developerService.createDeveloper(createDeveloperDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Developer has been created successfully', newDeveloper,
            });
        }
        catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Developer not created!',
                error: 'Bad Request'
            });
        }
    }

    @Put('update/:id')
    @ApiCreatedResponse({ description: 'Actualiza un developer.' })
    async updateDeveloper(@Res() response, @Param('id') developerId: string, @Body() updateDeveloperDto: UpdateDeveloperDto) {
        try {
            const updatedDeveloper = await this.developerService.updateDeveloper(developerId, updateDeveloperDto);
            return response.status(HttpStatus.OK).json({
                message: 'Developer has been successfully updated',
                updatedDeveloper,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('delete/:id')
    @ApiCreatedResponse({ description: 'Borra un developer.' })
    async deleteDeveloper(@Res() response, @Param('id') developerId: string) {
        try {
            const deletedUser = await this.developerService.deleteDeveloper(developerId);
            return response.status(HttpStatus.OK).json({
                message: 'Developer deleted successfully',
                deletedUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}

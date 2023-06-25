import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PlatformService } from 'src/platform/platform.service';
import { CreatePlatformDto } from './dto/createPlatform.dto';
import { UpdatePlatformDto } from './dto/updatePlatform.dto';

@ApiTags('Platform')
@Controller('platform')
export class PlatformController {
    constructor(private readonly platformService: PlatformService) { }

    @Get()
    @ApiCreatedResponse({ description: 'Toda la información de las plataformas.' })
    async getAllPlatforms(@Res() response) {
        try {
            const platformData = await this.platformService.getAllPlatforms();
            return response.status(HttpStatus.OK).json({
                message: 'All platform data found successfully', platformData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    
    @Get(':id')
    @ApiCreatedResponse({ description: 'Información de una plataforma en concreto.' })
    async getPlatform(@Res() response, @Param('id') platformId: string) {
        try {
            const platformData = await this.platformService.getPlatform(platformId);
            return response.status(HttpStatus.OK).json({
                message: 'Platform data found successfully', platformData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Post('new')
    @ApiCreatedResponse({ description: 'Creación de una nueva plataforma.' })
    async createPlatform(@Res() response, @Body() createPlatformDto: CreatePlatformDto) {
        try {
            const newPlatform = await this.platformService.createPlatform(createPlatformDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Platform has been created successfully', newPlatform,
            });
        }
        catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Platform not created!',
                error: 'Bad Request'
            });
        }
    }

    @Put('update/:id')
    @ApiCreatedResponse({ description: 'Actualiza una plataforma.' })
    async updatePlatform(@Res() response, @Param('id') platformId: string, @Body() updatePlatformDto: UpdatePlatformDto) {
        try {
            const updatedPlatform = await this.platformService.updatePlatform(platformId, updatePlatformDto);
            return response.status(HttpStatus.OK).json({
                message: 'Platform has been successfully updated',
                updatedPlatform,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('delete/:id')
    @ApiCreatedResponse({ description: 'Borra una plataforma.' })
    async deletePlatform(@Res() response, @Param('id') platformId: string) {
        try {
            const deletedUser = await this.platformService.deletePlatform(platformId);
            return response.status(HttpStatus.OK).json({
                message: 'Platform deleted successfully',
                deletedUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}

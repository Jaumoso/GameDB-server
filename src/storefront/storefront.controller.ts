import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { StorefrontService } from './storefront.service';
import { CreateStorefrontDto } from './dto/createStorefront.dto';
import { UpdateStorefrontDto } from './dto/updateStorefront.dto';
import { sanitizeFilter } from 'mongoose';

@ApiTags('Storefront')
@Controller('storefront')
export class StorefrontController {
    constructor(private readonly storefrontService: StorefrontService) { }

    @Get()
    @ApiCreatedResponse({ description: 'Toda la información de las tiendas.' })
    async getAllStorefronts(@Res() response) {
        try {
            const storefrontData = await this.storefrontService.getAllStorefronts();
            return response.status(HttpStatus.OK).json({
                message: 'All storefront data found successfully', storefrontData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get(':id')
    @ApiCreatedResponse({ description: 'Información de una tienda en concreto.' })
    async getStorefront(@Res() response, @Param('id') storefrontId: string) {
        try {
            const storefrontData = await this.storefrontService.getStorefront(storefrontId);
            return response.status(HttpStatus.OK).json({
                message: 'Storefront data found successfully', storefrontData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Post('new')
    @ApiCreatedResponse({ description: 'Creación de una nueva tienda.' })
    async createStorefront(@Res() response, @Body() createStorefrontDto: CreateStorefrontDto) {
        try {
            const newStorefront = await this.storefrontService.createStorefront(createStorefrontDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Storefront has been created successfully', newStorefront,
            });
        }
        catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Storefront not created!',
                error: 'Bad Request'
            });
        }
    }

    @Put('update/:id')
    @ApiCreatedResponse({ description: 'Actualiza una tienda.' })
    async updateStorefront(@Res() response, @Param('id') storefrontId: string, @Body() updateStorefrontDto: UpdateStorefrontDto) {
        try {
            const updatedStorefront = await this.storefrontService.updateStorefront(storefrontId, sanitizeFilter(updateStorefrontDto));
            return response.status(HttpStatus.OK).json({
                message: 'Storefront has been successfully updated',
                updatedStorefront,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('delete/:id')
    @ApiCreatedResponse({ description: 'Borra una tienda.' })
    async deleteStorefront(@Res() response, @Param('id') storefrontId: string) {
        try {
            const deletedUser = await this.storefrontService.deleteStorefront(storefrontId);
            return response.status(HttpStatus.OK).json({
                message: 'Storefront deleted successfully',
                deletedUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}

import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreatePublisherDto } from './dto/createPublisher.dto';
import { PublisherService } from './publisher.service';
import { UpdatePublisherDto } from './dto/updatePublisher.dto';

@ApiTags('Publisher')
@Controller('publisher')
export class PublisherController {
    constructor(private readonly publisherService: PublisherService) { }

    @Get()
    @ApiCreatedResponse({ description: 'Toda la información de las editoras.' })
    async getAllPublishers(@Res() response) {
        try {
            const publisherData = await this.publisherService.getAllPublishers();
            return response.status(HttpStatus.OK).json({
                message: 'All publisher data found successfully', publisherData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get(':id')
    @ApiCreatedResponse({ description: 'Información de una editora en concreto.' })
    async getPublisher(@Res() response, @Param('id') publisherId: string) {
        try {
            const publisherData = await this.publisherService.getPublisher(publisherId);
            return response.status(HttpStatus.OK).json({
                message: 'Publisher data found successfully', publisherData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Post('new')
    @ApiCreatedResponse({ description: 'Creación de una nueva editora.' })
    async createPublisher(@Res() response, @Body() createPublisherDto: CreatePublisherDto) {
        try {
            const newPublisher = await this.publisherService.createPublisher(createPublisherDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Publisher has been created successfully', newPublisher,
            });
        }
        catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Publisher not created!',
                error: 'Bad Request'
            });
        }
    }

    @Put('update/:id')
    @ApiCreatedResponse({ description: 'Actualiza una editora.' })
    async updatePublisher(@Res() response, @Param('id') publisherId: string, @Body() updatePublisherDto: UpdatePublisherDto) {
        try {
            const updatedPublisher = await this.publisherService.updatePublisher(publisherId, updatePublisherDto);
            return response.status(HttpStatus.OK).json({
                message: 'Publisher has been successfully updated',
                updatedPublisher,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('delete/:id')
    @ApiCreatedResponse({ description: 'Borra una editora.' })
    async deletePublisher(@Res() response, @Param('id') publisherId: string) {
        try {
            const deletedUser = await this.publisherService.deletePublisher(publisherId);
            return response.status(HttpStatus.OK).json({
                message: 'Publisher deleted successfully',
                deletedUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}

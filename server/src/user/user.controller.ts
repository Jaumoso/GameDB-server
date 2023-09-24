import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserService } from "./user.service";
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserContentDto } from './dto/updateUserContent.dto';
import { sanitizeFilter } from 'mongoose';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @ApiCreatedResponse({ description: 'Toda la información de los usuarios.' })
    async getUsers(@Res() response) {
        try {
            const userData = await this.userService.getAllUsers();
            return response.status(HttpStatus.OK).json({
                message: 'All users data found successfully', userData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get(':id')
    @ApiCreatedResponse({ description: 'Información de un usuario en concreto.' })
    async getUser(@Res() response, @Param('id') userId: string) {
        try {
            const userData = await this.userService.getUser(userId);
            return response.status(HttpStatus.OK).json({
                message: 'User data found successfully', userData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('checkexistinguser/:username')
    @ApiCreatedResponse({ description: 'This function will check if a user exists in the database based on email and username' })
    async checkExistingUser(@Res() response, @Param('username') username: string) {
        try {
            const userData = await this.userService.checkExistingUser(username);
            return response.status(HttpStatus.OK).json({
                message: 'User data found successfully', userData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    
    @Post('new')
    @ApiCreatedResponse({ description: 'Creación de un nuevo usuario.' })
    async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
        try {
            const newUser = await this.userService.createUser(createUserDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'User has been created successfully', newUser,
            });
        }
        catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User not created!',
                error: 'Bad Request'
            });
        }
    }

    @Put('update/:id')
    @ApiCreatedResponse({ description: 'Actualiza un usuario.' })
    async updateUser(@Res() response, @Param('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
        try {
            const existingUser = await this.userService.updateUser(userId, sanitizeFilter(updateUserDto));
            return response.status(HttpStatus.OK).json({
                message: 'User has been successfully updated',
                existingUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Put('update/content/:id')
    @ApiCreatedResponse({ description: 'Actualiza el contenido de la libreria del usuario.' })
    async updateUserContent(@Res() response, @Param('id') userId: string, @Body() updateUserContent: UpdateUserContentDto) {
        try {
            const updatedUser = await this.userService.updateUserContent(userId, sanitizeFilter(updateUserContent));
            return response.status(HttpStatus.OK).json({
                message: 'User has been successfully updated',
                updatedUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('delete/:id')
    @ApiCreatedResponse({ description: 'Borra un usuario.' })
    async deleteUser(@Res() response, @Param('id') userId: string) {
        try {
            const deletedUser = await this.userService.deleteUser(userId);
            return response.status(HttpStatus.OK).json({
                message: 'User deleted successfully',
                deletedUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    
}

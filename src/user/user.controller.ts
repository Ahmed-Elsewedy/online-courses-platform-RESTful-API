import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { User } from './entities/user.entity';
import { Response } from 'express';
import { UpdateDto } from 'src/auth/dto/update.dto';
import { PasswordDto } from 'src/auth/dto/password.dto';
import { AuthenticateDto } from 'src/auth/dto/authenticate.dto';
import { Role } from 'src/auth/interface/role';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @Roles('admin', 'manager')
    @UseGuards(JwtGuard, RoleGuard)
    async findAll(@Req() req): Promise<User[]> {
        return this.userService.findAll()
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() loginDto: Record<string, any>) {
        return this.userService.login(loginDto.email, loginDto.password)
    }

    @Post('register')
    async register(@Body() data: AuthenticateDto, @Res() res: Response) {
        if (data?.role)
            data.role = Role.User
        try {
            const user = await this.userService.register(data);
            return res.status(HttpStatus.CREATED).json({ message: 'User registered successfully', user });
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    @UseGuards(JwtGuard)
    @Get('profile/')
    profile(@Req() req, @Param('id') id) {
        return req.user
    }

    @UseGuards(JwtGuard)
    @Patch('profile')
    updateProfile(@Req() req, @Body() data: UpdateDto) {
        return this.userService.updateProfile(data, req.user.id)
    }

    @UseGuards(JwtGuard)
    @Patch('password')
    async updatePassword(@Req() req, @Body() data: PasswordDto) {
        try {
            return this.userService.updatePassword(data, req.user.id)
        } catch (err) {
            throw err;
        }
    }


    @Roles('admin', 'manager')
    @UseGuards(JwtGuard)
    @Delete(':id')
    deleteUser(@Req() req, @Param('id') id) {
        return this.userService.deleteUser(id)
    }
}
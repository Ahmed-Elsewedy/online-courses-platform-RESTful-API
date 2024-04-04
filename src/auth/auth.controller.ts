import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { Response } from 'express';
import { JwtGuard } from './guard/jwt.guard';
import { Roles } from './roles/roles.decorator';
import { RoleGuard } from './role/role.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    login(@Res() res: Response, @Body() authenticateDto: AuthenticateDto) {
        try {
            const response = this.authService.authenticate(authenticateDto);
            return res.status(HttpStatus.OK).json(response);
        } catch (err) {
            res.status(err.status).json(err.response);
        }
    }

    @Roles('admin')
    @UseGuards(JwtGuard, RoleGuard)
    @Get()
    profile(@Req() req) {
        return req.user
    }
}

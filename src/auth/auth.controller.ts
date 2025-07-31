import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';



@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post("login")
    async login(@Body() loginDto: { name: string; password: string }, @Res() res: Response
    ) {
        const Response = await this.authService.login(loginDto.name, loginDto.password)
        if (Response?.token)
            res.setHeader('Authorization', `Bearer ${Response.token}`)
        return res.status(201).json({ message: 'Login successful' });
    }

    @Post("register")
    async register(@Body() loginDto: { name: string; password: string }) {
        const messge = await this.authService.register(loginDto.name, loginDto.password)
        return { message: messge }
    }


}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';



@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("login")
    async login(@Body() loginDto: { name: string; password: string }) {
        const messge = await this.authService.login(loginDto.name, loginDto.password)
        return { message: messge }
    }

    @Post("register")
    async register(@Body() loginDto: { name: string; role: "soldier" | "commander"; password: string }) {
        const messge = await this.authService.register(loginDto.name, loginDto.role, loginDto.password)
        return { message: messge }
    }



}

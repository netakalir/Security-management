import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';



@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("login")
    login(@Body() loginDto: { name: string; role: string }) {
        const messge = this.authService.login(loginDto.name, loginDto.role)
        return { messge: messge }
    }

    @Post("register")
    register(@Body() loginDto: { name: string; role: string; password: string }) {
        const messge = this.authService.register(loginDto.name, loginDto.role, loginDto.password)
        return { messge: messge }
    }



}

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    @UseGuards(AuthGuard)
    @Get()
    async getAll() {
        return await this.usersService.getAllUsers()
    }

    @Get()
    async getByName(@Param() name: string) {
        return await this.usersService.findOne(name)
    }
}

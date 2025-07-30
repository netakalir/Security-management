import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User, UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';



@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    @UseGuards(AuthGuard)
    @Get()
    async getAll() {
        return await this.usersService.getAllUsers()
    }

    @Get("getByName/:name")
    async getByName(@Param("name") name: string) {
        return await this.usersService.findOne(name)
    }

    @Post("create")
    async create(@Body() user: User) {
        return await this.usersService.createUser(user)
    }


}

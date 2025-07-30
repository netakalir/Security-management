import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService){}
    @Get()
    async getAll(){
        return await this.usersService.getAllUsers()
    }

    @Get()
    async getByID(@Param() name: string){
        return await this.usersService.findOne(name)
    }
}

import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Shifts, ShiftsService } from './shifts.service';
import { RoleGuard } from '../guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('shifts')
export class ShiftsController {
    constructor(private readonly shiftsService: ShiftsService) { }
    @UseGuards(RoleGuard)
    @Get()
    async getAll() {
        return await this.shiftsService.getAll()
    }

    @Get(":id")
    async getById(@Param(":id") id: string) {
        return await this.shiftsService.getOne(id)
    }
    @UseGuards(RoleGuard)
    @Post("create")
    async create(@Body() newShift: Shifts) {
        return await this.shiftsService.createShift(newShift)
    }
}

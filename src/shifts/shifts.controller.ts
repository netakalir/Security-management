import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Shifts, ShiftsService } from './shifts.service';

@Controller('shifts')
export class ShiftsController {
    constructor(private readonly shiftsService: ShiftsService) { }

    @Get()
    async getAll() {
        return await this.shiftsService.getAll()
    }

    @Get(":id")
    async getById(@Param(":id") id: string) {
        return await this.shiftsService.getOne(id)
    }

    @Post("create")
    async create(@Body() newShift: Shifts) {
        return await this.shiftsService.createShift(newShift)
    }
}

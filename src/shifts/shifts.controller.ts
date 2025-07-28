import { Controller, Get } from '@nestjs/common';
import { ShiftsService } from './shifts.service';

@Controller('shifts')
export class ShiftsController {
    constructor(private readonly shiftsService: ShiftsService){}

    @Get()
    getMsg():string{
        return this.shiftsService.getMsg()
    }
}

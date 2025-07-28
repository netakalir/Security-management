import { Injectable } from '@nestjs/common';

@Injectable()
export class ShiftsService {
    getMsg():string{
        return "Your task has been added to your shift list."
    }
}

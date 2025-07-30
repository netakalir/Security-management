import { Controller, Get, Param } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';

@Controller('assignments')
export class AssignmentsController {
    constructor(private readonly assignmentsService: AssignmentsService) { }

    @Get()
    async getAll() {
        return await this.assignmentsService.getAll()
    }

    @Get(":id")
    async getById(@Param(":id") id: string) {
        return await this.assignmentsService.getOne(id)
    }
}

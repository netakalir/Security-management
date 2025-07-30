import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Assignments, AssignmentsService } from './assignments.service';

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

    @Post("create")
    async create(@Body() newAssignments:Assignments ) {
        return await this.assignmentsService.createAssignment(newAssignments)
    }
}

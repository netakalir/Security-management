import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Assignments, AssignmentsService } from './assignments.service';
import { RoleGuard } from '../guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('assignments')
export class AssignmentsController {
    constructor(private readonly assignmentsService: AssignmentsService) { }
    @UseGuards(RoleGuard)
    @Get()
    async getAll() {
        return await this.assignmentsService.getAll()
    }

    @Get(":id")
    async getById(@Param(":id") id: string) {
        return await this.assignmentsService.getOne(id)
    }
    @UseGuards(RoleGuard)
    @Post("create")
    async create(@Body() newAssignments: Assignments) {
        return await this.assignmentsService.createAssignment(newAssignments)
    }
}

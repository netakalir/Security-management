import { Controller, Get } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';

@Controller('assignments')
export class AssignmentsController {
    constructor(private readonly assignmentsService: AssignmentsService) { }

    @Get()
    getAns(): string {
        return this.assignmentsService.getHello()
    }
}

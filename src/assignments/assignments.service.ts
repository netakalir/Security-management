import { Injectable } from '@nestjs/common';

export type Assignments = {
  id: string
  userId: number;
  shiftId: number;
}

@Injectable()
export class AssignmentsService {
  public assignments: Assignments[] = [{ id: "5", userId: 6, shiftId: 9 }]
  async getAll() {
    return this?.assignments
  }

  async getOne(id: string) {
    const assignment = this.assignments.find(assignment => assignment.id === id)
    return assignment
  }

  async createAssignment(assignment: Assignments) {
    const newAssignments = { id: String(Date.now()), userId: assignment.userId, shiftId: assignment.shiftId }
    this.assignments.push(newAssignments)
    return newAssignments
  }
}

import { Injectable } from '@nestjs/common';

export type Shifts = {
    id: string
    startTime: string;
    endTime: string;
    location: string
}

@Injectable()
export class ShiftsService {
    public shifts: Shifts[] = [{ id: "1", startTime: "2", endTime: "3", location: "israel" }]
    
    async getAll() {
        return this?.shifts
    }

    async getOne(id: string) {
        const shift = this.shifts.find(shift => shift.id === id)
        return shift
    }

    async createShift(shift: Shifts) {
        const newshift = { id: String(Date.now()), startTime:shift.startTime , endTime: shift.endTime, location:shift.location}
        // this.assignments.push(newAssignments)
        return newshift
    }
}
import { Injectable } from '@nestjs/common';

@Injectable()
export class AssignmentsService {
    getHello(): string {
    return 'Hello soldier!';
  }
}

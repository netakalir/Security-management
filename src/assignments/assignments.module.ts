import { Module } from '@nestjs/common';
import { AssignmentsController } from './assignments.controller';
import { AssignmentsService } from './assignments.service';

@Module({
  controllers: [AssignmentsController],//בקרים שיטפלו בבקשות HTTP
  providers: [AssignmentsService],//שירותים שאני מזריק למודול ונותן לו אפשרות להשתמש בהם
  imports:[],//מודלים אחרים שאני רוצה להתשמש בהם
  exports:[AssignmentsService]//מודלים שאני רוצה לייצא לשימוש במודלים אחרים
})
export class AssignmentsModule {}

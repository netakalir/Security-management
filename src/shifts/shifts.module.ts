import { Module } from '@nestjs/common';
import { ShiftsController } from './shifts.controller';
import { ShiftsService } from './shifts.service';

@Module({
  controllers: [ShiftsController],//בקרים שיטפלו בבקשות HTTP
  providers: [ShiftsService],//שירותים שאני מזריק למודול ונותן לו אפשרות להשתמש בהם
  imports:[],//מודלים אחרים שאני רוצה להתשמש בהם
  exports:[]//מודלים שאני רוצה לייצא לשימוש במודלים אחרים
})
export class ShiftsModule {}

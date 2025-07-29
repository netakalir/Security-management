import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],//בקרים שיטפלו בבקשות HTTP
  providers: [UsersService],//שירותים שאני מזריק למודול ונותן לו אפשרות להשתמש בהם
  exports:[UsersService],//מודלים שאני רוצה לייצא לשימוש במודלים אחרים
  imports:[]//מודלים אחרים שאני רוצה להתשמש בהם
})
export class UsersModule {}

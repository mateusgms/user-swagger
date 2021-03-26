import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [
        UsersController, UsersController],
  providers: [
        UsersService, UsersService],
})
export class UsersModule {}

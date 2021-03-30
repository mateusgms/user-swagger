import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
      imports:[TypeOrmModule.forFeature([User])],
  controllers: [
        UsersController, UsersController],
  providers: [
        UsersService, UsersService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { configService, ConfigService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()),UsersModule],
  providers: [ConfigService],
})
export class AppModule { }

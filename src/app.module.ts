import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { configService, ConfigService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsersModule,TypeOrmModule.forRoot(configService.getTypeOrmConfig())],
  providers: [ConfigService],
})
export class AppModule { }

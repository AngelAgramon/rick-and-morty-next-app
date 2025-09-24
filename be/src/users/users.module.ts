import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
})
export class UsersModule {}
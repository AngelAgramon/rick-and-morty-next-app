import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [UserController],
  providers: [
    AuthService,
    {
      provide: 'IAuthService',
      useClass: AuthService,
    }
],
})
export class UsersModule {}
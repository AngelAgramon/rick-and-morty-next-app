import { Controller, Post, Body, Inject, UseGuards } from '@nestjs/common';
import type { IAuthService } from './auth.service';
import type { UserDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: UserDto) {
    const user = await this.authService.validateUser(loginDto);
    if (user.success) {
      const token = jwt.sign({ username: user.username }, 'your_jwt_secret', {
        expiresIn: '1h',
      });
      return { success: true, token, user };
    }
    return { success: false, message: 'Credenciales inválidas' };
  }

  @Post('register')
  async register(@Body() registerDto: UserDto) {
    const user = await this.authService.createUser(registerDto);
    return user;
  }


  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout() {
    return { success: true, message: 'Sesión cerrada correctamente' };
  }
}

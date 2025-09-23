import { Controller, Inject } from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Get } from "@nestjs/common";
import type { IAuthService } from '../auth/auth.service';

@Controller('users')
export class UserController {

  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUsers() {
    const users = await this.authService.getUsers();
    if (users.success) {
      return { success: true, users };
    }
    return { success: false, message: 'Error al obtener los usuarios' };
  }
}
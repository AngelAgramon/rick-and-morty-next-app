import { Injectable } from '@nestjs/common';
import { LoginDto, LoginResponseDto, User } from './dto/login.dto';

@Injectable()
export class AuthService implements IAuthService{
  private readonly users: User[] = [
    { username: 'user', password: 'password' },
    { username: 'admin', password: 'admin123' },
  ];

  async validateUser(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = this.users.find(
      u => u.username === loginDto.username && u.password === loginDto.password
    );

    if (user) {
      return {
        success: true,
        message: 'Login successful',
        token: 'fake-jwt-token-123',
        username: user.username
      };
    }

    return {
      success: false,
      message: 'Invalid username or password'
    };
  }
}

export interface IAuthService {
  //solo lo publico 
  validateUser(loginDto: LoginDto): Promise<LoginResponseDto>;
}


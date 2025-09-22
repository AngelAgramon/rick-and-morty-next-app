import { Injectable } from '@nestjs/common';
import { UserDto, AuthResponseDto, User } from './dto/auth.dto';

@Injectable()
export class AuthService implements IAuthService {
  private readonly users: User[] = [
    { username: 'user', password: 'password' },
    { username: 'admin', password: 'admin123' },
  ];

  async validateUser(loginDto: UserDto): Promise<AuthResponseDto> {
    const user = this.users.find(
      (u) =>
        u.username === loginDto.username && u.password === loginDto.password,
    );

    if (user) {
      return {
        success: true,
        message: 'Login successful',
        token: 'fake-jwt-token-123',
        username: user.username,
      };
    }

    return {
      success: false,
      message: 'Invalid username or password',
    };
  }

  async createUser(newUserDto: UserDto): Promise<AuthResponseDto> {
    const exists = this.users.some(u => u.username === newUserDto.username);
    if (exists) {
      return {
        success: false,
        message: 'Username already exists',
      };
    }
    this.users.push(newUserDto);
    return {
      success: true,
      message: 'User created successfully',
      username: newUserDto.username,
    };
  }
}

export interface IAuthService {
  //solo lo publico
  validateUser(loginDto: UserDto): Promise<AuthResponseDto>;
  createUser(newUserDto: UserDto): Promise<AuthResponseDto>;
}

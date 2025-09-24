import { Injectable } from '@nestjs/common';
import { UserDto, AuthResponseDto, User } from './dto/auth.dto';
import { UsersResponseDto } from '../users/dto/user.dto';

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
    console.log('User added:', newUserDto);
    console.log('Updated users list:', this.users); // Imprime el arreglo actualizado
    return {
      success: true,
      message: 'User created successfully',
      username: newUserDto.username,
    };
  }

  getUsers(): Promise<UsersResponseDto> {
    const listUsers = this.users.map(u => ({ username: u.username }));
    const returnValue = {
      success: true,
      users: listUsers,
    };
    return Promise.resolve(returnValue);
  }
}

export interface IAuthService {
  //solo lo publico
  validateUser(loginDto: UserDto): Promise<AuthResponseDto>;
  createUser(newUserDto: UserDto): Promise<AuthResponseDto>;
  getUsers(): Promise<UsersResponseDto>;
}

import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  username: string = '';

  @IsString()
  @MinLength(4)
  password: string = '';
}

export class LoginResponseDto {
  success: boolean = false;
  message?: string;
  token?: string;
  username?: string;
}

export class User {
  username: string = '';
  password: string = '';
}
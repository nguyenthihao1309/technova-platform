import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid Email.' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must have at least 6 characters.' })
  password: string;
}

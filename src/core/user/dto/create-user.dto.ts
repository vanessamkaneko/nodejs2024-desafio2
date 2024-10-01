import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required!' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Email is required!' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;
}

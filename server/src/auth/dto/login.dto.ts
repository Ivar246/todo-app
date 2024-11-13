import {
  IsEmail,
  IsNotEmpty,
  IsString,
  max,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Length of password should be at least of 8' })
  @MaxLength(20, { message: 'Length of password should be at most 20' })
  password: string;
}

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  max,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30, { message: 'length of username exceed 30' })
  @MinLength(3, { message: 'length of username should be at least of 3' })
  username: string;

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

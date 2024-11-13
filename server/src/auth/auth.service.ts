import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { LoginDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload, User, UserWithoutPassword } from '../common/interfaces';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: SignupDto): Promise<UserWithoutPassword> {
    try {
      const user = await this.userService.create(dto);

      console.log(user);
      // return user without password
      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(
    dto: LoginDto,
  ): Promise<{ access_token: string; user: UserWithoutPassword }> {
    try {
      // check if user with email exist
      const user = await this.userService.fetchOneByEmail(dto.email);

      if (!user) throw new BadRequestException("user with email doesn't exist");

      const isMatch = await argon.verify(user.password_hash, dto.password);

      if (!isMatch) {
        throw new BadRequestException('Your password is incorrect.');
      }

      const payload: AuthPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      // generate and send token
      const token = this.jwt.sign(payload, {
        secret: this.config.get('ACCESS_TOKEN_SECRET'),
        expiresIn: '1d',
      });

      return { access_token: token, user };
    } catch (error) {
      throw error;
    }
  }
}

import { Roles } from './../common/decorators/role.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as argon from 'argon2';
import { CreateUserDto } from './dto';
import { UserWithoutPassword, User } from 'src/common/interfaces';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async create(dto: CreateUserDto): Promise<UserWithoutPassword> {
    try {
      // check if user with email exist
      let user = await this.prismaService.user.findUnique({
        where: { email: dto.email },
      });

      if (user) throw new ConflictException('user with email already exist');

      //save user in database
      user = await this.prismaService.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          password_hash: await argon.hash(dto.password),
          role: dto.role ? dto.role : Role.USER,
        },
      });

      // return user without password
      return user;
    } catch (error) {
      throw error;
    }
  }

  async fetchOneById(user_id: number, currentUser: Partial<User>) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: user_id },
      });

      if (!user)
        throw new BadRequestException(`user with id ${user_id} doesn't exist`);
      if (currentUser.role !== Role.ADMIN && currentUser.id !== user.id)
        throw new ForbiddenException(
          'You are not allowed to delete this user.',
        );
      return user;
    } catch (error) {
      throw error;
    }
  }

  async fetchOneByEmail(email: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email: email },
      });

      if (!user)
        throw new BadRequestException(`user with email ${email} doesn't exist`);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async fetchAll() {
    try {
      const users = await this.prismaService.user.findMany({
        select: { id: true, username: true, email: true, role: true },
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(user_id: number, currentUser: Partial<User>) {
    try {
      // check if user exist or not, if exist then delete  else throw error
      let user = await this.prismaService.user.findUnique({
        where: { id: user_id },
      });

      if (!user) {
        throw new BadRequestException(`user with ${user_id} doesn't exist.`);
      }

      if (currentUser.role !== Role.ADMIN && currentUser.id !== user.id)
        throw new ForbiddenException(
          'You are not allowed to delete this user.',
        );
      user = await this.prismaService.user.delete({
        where: { id: user_id },
      });

      return { deleted_user: user };
    } catch (error) {
      throw error;
    }
  }
}

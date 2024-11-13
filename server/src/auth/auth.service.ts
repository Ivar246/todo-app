import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async register() {
    try {
      // check if user with email exist
      //save user in database
      // return user without password
    } catch (error) {
      throw error;
    }
  }

  login() {
    try {
    } catch (error) {
      throw error;
    }
  }
}

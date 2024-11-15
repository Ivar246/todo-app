import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { Public, Roles, GetUser } from 'src/common/decorators';
import { Role } from 'src/common/enum';
import { RolesGuard } from 'src/auth/guards';
import { User } from '@prisma/client';
@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // only admin
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // admin and owner
  @Roles(Role.ADMIN, Role.USER)
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  fetchOneById(
    @Param('id', ParseIntPipe) user_id: number,
    @GetUser() user: Partial<User>,
  ) {
    return this.userService.fetchOneById(user_id, user);
  }

  // admin
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get('/')
  fetchAll() {
    return this.userService.fetchAll();
  }

  // admin and owner
  @Roles(Role.ADMIN, Role.USER)
  @HttpCode(HttpStatus.OK)
  @Delete('/delete/:id')
  deleteById(
    @Param('id', ParseIntPipe) user_id: number,
    @GetUser() user: Partial<User>,
  ) {
    return this.userService.deleteById(user_id, user);
  }
}

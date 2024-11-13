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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { Public, Roles } from 'src/common/decorators';
import { Role } from 'src/common/enum';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // only admin
  @Public()
  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // admin and owner
  @Get('/:id')
  fetchOneByIdOrEmail() {}

  // admin
  @HttpCode(HttpStatus.OK)
  @Get('/all')
  fetchAll() {
    return this.userService.fetchAll();
  }

  // admin and owner
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Delete('/delete/:id')
  deleteById(@Param('id', ParseIntPipe) user_id: number) {
    return this.userService.deleteById(user_id);
  }
}

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
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto, TodoFilterDto, UpdateTodoDto } from './dto';
import { Public, Roles, GetUser } from 'src/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './config';
import { RolesGuard } from 'src/auth/guards';
import { Role } from 'src/common/enum';
import { User } from '@prisma/client';
@UseGuards(RolesGuard)
@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  create(@Body() todoDto: CreateTodoDto, @GetUser('id') user_id: number) {
    return this.todoService.create(todoDto, user_id);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('/')
  fetchAll(@Query() todoFilterDto: TodoFilterDto) {
    return this.todoService.fetchAll(todoFilterDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('/search')
  search(@Query('q') q: string) {
    return this.todoService.search(q);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  fetchOneById(@Param('id', ParseIntPipe) todo_id: number) {
    return this.todoService.fetchOneById(todo_id);
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Put('/update/:id')
  updateById(
    @Param('id', ParseIntPipe) todo_id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @GetUser() user: Partial<User>,
  ) {
    return this.todoService.updateById(todo_id, updateTodoDto, user);
  }

  @Roles(Role.ADMIN, Role.USER)
  @HttpCode(HttpStatus.OK)
  @Delete('/delete/:id')
  deleteById(
    @Param('id', ParseIntPipe) todo_id: number,
    @GetUser() user: Partial<User>,
  ) {
    return this.todoService.deleteById(todo_id, user);
  }

  @UseInterceptors(FileInterceptor('image', multerConfig))
  @Roles(Role.ADMIN, Role.USER)
  @Post('/upload/:id')
  upload(
    @Param('id', ParseIntPipe) todo_id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.todoService.upload(file.filename, todo_id);
  }
}

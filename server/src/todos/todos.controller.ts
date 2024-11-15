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
  UseInterceptors,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto, TodoFilterDto, UpdateTodoDto } from './dto';
import { Public, User } from 'src/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './config';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Public()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @Post('/upload/:id')
  upload(
    @Param('id', ParseIntPipe) todo_id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.todoService.upload(file.filename, todo_id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  create(@Body() todoDto: CreateTodoDto, @User('id') user_id: number) {
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
    console.log('yo');

    return this.todoService.fetchOneById(todo_id);
  }

  @HttpCode(HttpStatus.OK)
  @Put('/update/:id')
  updateById(
    @Param('id', ParseIntPipe) todo_id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.updateById(todo_id, updateTodoDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/delete/:id')
  deleteById(@Param('id', ParseIntPipe) todo_id: number) {
    return this.todoService.deleteById(todo_id);
  }
}

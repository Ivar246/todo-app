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
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto, TodoFilterDto, UpdateTodoDto } from './dto';
import { Public, User } from 'src/common/decorators';

@Controller('todo')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  create(@Body() todoDto: CreateTodoDto, @User('id') user_id: number) {
    return this.todoService.create(todoDto, user_id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/todos')
  fetchAll(@Query() todoFilterDto: TodoFilterDto) {
    return this.todoService.fetchAll(todoFilterDto);
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

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('/todos/search')
  search(@Query('q') q: string) {
    console.log('finally searchin');
    return this.todoService.search(q);
  }
}

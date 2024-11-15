import { TodoFilterDto } from './dto/todoFilter.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './dto';

@Injectable()
export class TodosService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateTodoDto, user_id: number) {
    console.log(user_id);
    try {
      const todo = await this.prismaService.todo.create({
        data: {
          title: dto.title,
          description: dto.description,
          dueDate: dto.dueDate,
          priority: dto.priority,
          status: dto.status,
          user_id: user_id,
        },
      });
      return todo;
    } catch (error) {
      throw error;
    }
  }

  async fetchAll(dto: TodoFilterDto) {
    try {
      let where: any = {};
      let orderBy: any = {};

      console.log(dto);
      // Filter by creation date range
      if (dto.createdAfter) {
        where.created_at = {
          ...where.created_at,
          gte: new Date(dto.createdAfter),
        };
      }
      if (dto.createdBefore) {
        where.created_at = {
          ...where.created_at,
          lte: new Date(dto.createdBefore),
        };
      }

      // Filter by status
      if (dto.status) {
        where.status = dto.status;
      }
      console.log;

      // Sort by due date
      if (dto.dueDateOrder) {
        orderBy.dueDate = dto.dueDateOrder;
      }
      const todos = await this.prismaService.todo.findMany({
        where,
        orderBy,
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });

      return { todos };
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async fetchOneById(todo_id: number) {
    try {
      const todo = await this.prismaService.todo.findUnique({
        where: { id: todo_id },
        select: {
          id: true,
          title: true,
          description: true,
          priority: true,
          status: true,
          dueDate: true,
        },
      });

      if (!todo)
        throw new BadRequestException(`todo with id ${todo_id} doesn't exist`);
      return { todo };
    } catch (error) {
      throw error;
    }
  }

  async search(q: string) {
    try {
      const todos = await this.prismaService.todo.findMany({
        where: {
          title: {
            search: q,
          },
          description: {
            search: q,
          },
        },
      });

      return { todos };
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async updateById(todo_id: number, dto: UpdateTodoDto) {
    try {
      const todo = await this.prismaService.todo.findFirst({
        where: { id: todo_id },
      });

      if (!todo)
        throw new BadRequestException(`todo with id ${todo_id} doesn't exist`);

      const updatedTodo = await this.prismaService.todo.update({
        where: { id: todo_id },
        data: { ...dto },
      });

      return updatedTodo;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(todo_id: number) {
    try {
      const todo = await this.prismaService.todo.findFirst({
        where: { id: todo_id },
      });

      if (!todo)
        throw new BadRequestException(`todo with id ${todo_id} doesn't exist`);

      const deletedTodo = await this.prismaService.todo.delete({
        where: { id: todo_id },
      });
    } catch (error) {
      throw error;
    }
  }

  async upload(filename: string, todo_id: number) {
    try {
      const imageUrl = 'http://localhost:3000/' + filename;

      const res = await this.prismaService.todo.update({
        where: { id: todo_id },
        data: {
          imageUrl: imageUrl,
        },
      });

      return { updateTodo: res };
      return {};
    } catch (error) {
      throw error;
    }
  }
}

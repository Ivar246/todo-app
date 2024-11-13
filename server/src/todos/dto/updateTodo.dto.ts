import { Priority, Status } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDate()
  @IsOptional()
  dueDate: Date;

  @IsEnum(Priority)
  @IsOptional()
  priority: Priority;

  @IsEnum(Status)
  @IsOptional()
  status: Status;
}

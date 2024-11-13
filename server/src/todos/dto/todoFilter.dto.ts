// todo-filter.dto.ts
import { IsOptional, IsDateString, IsEnum, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { Status } from '@prisma/client';

export class TodoFilterDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAfter?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdBefore?: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsEnum(['asc', 'desc'], { message: 'Sort order must be "asc" or "desc"' })
  dueDateOrder?: 'asc' | 'desc';
}

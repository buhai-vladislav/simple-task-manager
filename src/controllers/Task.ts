import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Get,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  Req,
} from '@nestjs/common';
import { TaskService } from '../services/Task';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/Task';
import { Task } from '@prisma/client';
import {
  DEFAULT_PAGINATION_PAGE,
  DEFAULT_PAGINATION_LIMIT,
} from '../utils/constants';
import { OrderBy } from '../types/Pagination';

@Controller('/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  public async createtask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Put()
  public async updateTask(@Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskService.updateTask(updateTaskDto);
  }

  @Delete('/:taskId')
  public async deleteTask(@Param('taskId') taskId: string): Promise<boolean> {
    return this.taskService.deleteTask(taskId);
  }

  @Get()
  public async getTasks(
    @Query('page', new DefaultValuePipe(DEFAULT_PAGINATION_PAGE), ParseIntPipe)
    page: number,
    @Query(
      'limit',
      new DefaultValuePipe(DEFAULT_PAGINATION_LIMIT),
      ParseIntPipe,
    )
    limit: number,
    @Query('search') search: string,
    @Query('orderBy') orderBy: OrderBy = OrderBy.ASC,
    @Req() request: any,
  ) {
    const authorId = request?.user?.id;
    return this.taskService.getTasks(authorId, {
      limit,
      page,
      orderBy,
      search,
    });
  }
}

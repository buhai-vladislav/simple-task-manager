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
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from '../services/Task';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/Task';
import {
  DEFAULT_PAGINATION_PAGE,
  DEFAULT_PAGINATION_LIMIT,
} from '../utils/constants';
import { OrderBy } from '../types/Pagination';
import { GetTasksResponse, Task } from '../types/Task';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({
    description: 'Endpoint for creating task.',
    operationId: 'createtaskAction',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The task successfully created.',
    type: Task,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "The checklist items wasn't created, or something went wrong.",
  })
  @ApiBody({ type: CreateTaskDto })
  @Post()
  public async createtask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @ApiOperation({
    description: 'Endpoint for updating task.',
    operationId: 'updateTaskAction',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The task successfully updated.',
    type: Task,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "The task wasn't created, or something went wrong.",
  })
  @ApiBody({ type: UpdateTaskDto })
  @Put()
  public async updateTask(@Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskService.updateTask(updateTaskDto);
  }

  @ApiOperation({
    description: 'Endpoint for delete task.',
    operationId: 'deleteTaskAction',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The task successfully deleted.',
    type: Task,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "The task wasn't deleted, or something went wrong.",
  })
  @ApiParam({
    name: 'taskId',
    description: 'The id of the task to delete.',
  })
  @Delete('/:taskId')
  public async deleteTask(@Param('taskId') taskId: string): Promise<boolean> {
    return this.taskService.deleteTask(taskId);
  }

  @ApiOperation({
    description: 'Endpoint for getting tasks paginated.',
    operationId: 'getTasksAction',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The tasks successfully retrived.',
    type: GetTasksResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "The tasks wasn't retrived, or something went wrong.",
  })
  @ApiQuery({
    description: 'The page number.',
    name: 'page',
  })
  @ApiQuery({
    description: 'The limit per page.',
    name: 'limit',
  })
  @ApiQuery({
    description: 'The search value.',
    name: 'search',
  })
  @ApiQuery({
    description: 'The sorting order.',
    name: 'orderBy',
    enum: OrderBy,
  })
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
  ): Promise<GetTasksResponse> {
    const authorId = request?.user?.id;
    return this.taskService.getTasks(authorId, {
      limit,
      page,
      orderBy,
      search,
    });
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { FindOptions, PaginationMeta } from './Pagination';

class CheckListItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  completed: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  taskId: string;
}

class TaskFindOptions extends FindOptions {
  @ApiProperty()
  search?: string;
}

class Task {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ nullable: true })
  description?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  authorId: string;

  @ApiProperty({ nullable: true, type: [CheckListItem] })
  checklistItems?: CheckListItem[];
}

class GetTasksResponse {
  @ApiProperty({ type: [Task] })
  tasks: Task[];

  @ApiProperty({ type: PaginationMeta })
  pagination: PaginationMeta;
}

export { Task, GetTasksResponse, TaskFindOptions, CheckListItem };

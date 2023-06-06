import { CheckListItem } from '@prisma/client';
import { FindOptions, PaginationMeta } from './Pagination';

class TaskFindOptions extends FindOptions {
  search?: string;
}

class Task {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  checklistItems?: CheckListItem[];
}

class GetTasksResponse {
  tasks: Task[];
  pagination: PaginationMeta;
}

export { Task, GetTasksResponse, TaskFindOptions };

import { CheckListItem, Task } from '@prisma/client';
import { FindOptions, IPaginationMeta } from './Pagination';

class TaskFindOptions extends FindOptions {
  search?: string;
}

interface ITask extends Task {
  checklistItems?: CheckListItem[];
}

interface IGetTasksResponse {
  tasks: ITask[];
  pagination: IPaginationMeta;
}

export type { ITask, IGetTasksResponse };
export { TaskFindOptions };

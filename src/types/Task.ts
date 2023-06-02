import { CheckListItem, Task } from '@prisma/client';
import { FindOptions } from './Pagination';

class TaskFindOptions extends FindOptions {
  search?: string;
}

interface ITask extends Task {
  checklistItems?: CheckListItem[];
}

export type { ITask };
export { TaskFindOptions };

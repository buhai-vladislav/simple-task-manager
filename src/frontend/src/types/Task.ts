interface IGetTasks {
  page: number;
  limit?: number;
  search?: string;
  orderBy?: OrderBy;
}
enum OrderBy {
  ASC = 'asc',
  DESC = 'desc',
}

enum OperationType {
  REMOVE = 'remove',
  UPDATE = 'update',
  ADD = 'add',
}

interface IPaginataionMeta {
  count: number;
  limit: number;
  page: number;
  totalPages: number;
}

interface ICheckListItem {
  id: string;
  taskId: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  type?: OperationType;
}

interface ITask {
  id: string;
  authorId: string;
  title: string;
  description: string;
  checklistItems?: Array<ICheckListItem>;
  createdAt: Date;
  updatedAt: Date;
}

interface IGetTasksResponse {
  pagination: IPaginataionMeta;
  tasks: Array<ITask>;
}

interface IUpdateTask {
  id: string;
  title?: string;
  description?: string;
  checkListItems?: Partial<ICheckListItem>[];
}

interface ICreateTask {
  authorId: string;
  title?: string;
  description?: string;
  checkListItems?: { title?: string; completed?: boolean }[];
}

interface IUpdateChecklistItem {
  id: string;
  completed?: boolean;
}

export type {
  IGetTasks,
  IGetTasksResponse,
  ITask,
  ICheckListItem,
  IPaginataionMeta,
  IUpdateTask,
  ICreateTask,
  IUpdateChecklistItem,
};
export { OrderBy, OperationType };

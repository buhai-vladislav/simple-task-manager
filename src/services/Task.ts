import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './Prisma';
import { CheckListItem, Task } from '@prisma/client';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/Task';
import {
  CheckListItemDto,
  UpdateCheckListItemDto,
} from '../dtos/CheckListItem';
import { TaskFindOptions } from 'src/types/Task';
import { IPaginationMeta } from 'src/types/Pagination';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const { title, authorId, description, checkListItems } = createTaskDto;
      const task = this.prismaService.task.create({
        data: {
          authorId,
          title,
          description,
          checklistItems: {
            createMany: { data: checkListItems ?? [] },
          },
        },
      });

      return task;
    } catch (error) {
      throw new BadRequestException(JSON.stringify(error));
    }
  }

  public async updateTask(updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const { id, description, title } = updateTaskDto;
      const task = await this.prismaService.task.update({
        where: {
          id,
        },
        data: {
          description,
          title,
        },
      });

      return task;
    } catch (error) {
      throw new BadRequestException(JSON.stringify(error));
    }
  }

  public async deleteTask(id: string): Promise<boolean> {
    try {
      const result = await this.prismaService.task.delete({
        where: {
          id,
        },
      });

      return !!result;
    } catch (error) {
      throw new BadRequestException(JSON.stringify(error));
    }
  }

  public async getTasks(authorId: string, findOptions: TaskFindOptions) {
    try {
      const { limit, page, orderBy, search } = findOptions;
      const skip = page >= 1 ? (page - 1) * limit : limit;

      let options = {};

      if (search) {
        options = {
          title: {
            contains: search,
          },
        };
      }

      const where = {
        where: {
          AND: {
            authorId,
            ...options,
          },
        },
        orderBy: { createdAt: orderBy },
        take: limit,
        skip,
      };

      const tasksAction = this.prismaService.task.findMany({
        ...where,
        include: {
          checklistItems: true,
        },
      });
      const countAction = this.prismaService.task.count(where);

      const [count, tasks] = await Promise.all([countAction, tasksAction]);

      const totalPages = Math.ceil(count / limit);
      const pagination: IPaginationMeta = {
        page,
        limit,
        totalPages,
        count,
      };

      return { tasks, pagination };
    } catch (error) {
      throw new BadRequestException(JSON.stringify(error));
    }
  }

  public async createChecklistItems(
    taskId: string,
    createChecklistItemDtos: CheckListItemDto[],
  ): Promise<CheckListItem[]> {
    try {
      const mappedItems = createChecklistItemDtos.map(({ title, completed }) =>
        this.prismaService.checkListItem.create({
          data: { taskId, title, completed },
        }),
      );
      const items = await Promise.all(mappedItems);

      return items;
    } catch (error) {
      throw new BadRequestException(JSON.stringify(error));
    }
  }

  public async updateChecklistItems(
    updateChecklistItemsDtos: UpdateCheckListItemDto[],
  ): Promise<CheckListItem[]> {
    try {
      const mappedItems = updateChecklistItemsDtos.map(
        ({ id, completed, title }) =>
          this.prismaService.checkListItem.update({
            where: { id },
            data: { completed, title },
          }),
      );
      const items = await Promise.all(mappedItems);

      return items;
    } catch (error) {
      throw new BadRequestException(JSON.stringify(error));
    }
  }

  public async deleteChecklistItems(ids: string[]): Promise<string> {
    try {
      const items = await this.prismaService.checkListItem.deleteMany({
        where: { id: { in: ids } },
      });

      return `Removed ${items.count} ${items.count === 1 ? 'item' : 'items'}.`;
    } catch (error) {
      throw new BadRequestException(JSON.stringify(error));
    }
  }
}

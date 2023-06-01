import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { TaskService } from '../services/Task';
import { CheckListItem } from '@prisma/client';
import {
  CreateChecklistItemsDto,
  UpdateCheckListItemsDto,
  DeleteCheckListItemsDto,
} from '../dtos/CheckListItem';

@Controller('/checklist')
export class ChecklistController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/:taskId')
  public async createChecklistItems(
    @Param('taskId') taskId: string,
    @Body() createChecklistItemsDto: CreateChecklistItemsDto,
  ): Promise<CheckListItem[]> {
    return this.taskService.createChecklistItems(
      taskId,
      createChecklistItemsDto.items,
    );
  }

  @Put()
  public async updateChecklistItems(
    @Body() updateChecklistItemsDto: UpdateCheckListItemsDto,
  ): Promise<CheckListItem[]> {
    return this.taskService.updateChecklistItems(updateChecklistItemsDto.items);
  }

  @Delete()
  public async deleteChecklistItems(
    @Body() deleteChecklistItemsDto: DeleteCheckListItemsDto,
  ): Promise<string> {
    return this.taskService.deleteChecklistItems(deleteChecklistItemsDto.ids);
  }
}

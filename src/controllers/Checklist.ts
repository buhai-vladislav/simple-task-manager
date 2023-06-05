import { Body, Controller, Put } from '@nestjs/common';
import { TaskService } from '../services/Task';
import { CheckListItem } from '@prisma/client';
import { UpdateCheckListItemsDto } from '../dtos/CheckListItem';

@Controller('/checklist')
export class ChecklistController {
  constructor(private readonly taskService: TaskService) {}

  @Put()
  public async updateChecklistItems(
    @Body() updateChecklistItemsDto: UpdateCheckListItemsDto,
  ): Promise<CheckListItem[]> {
    return this.taskService.updateChecklistItems(updateChecklistItemsDto.items);
  }
}

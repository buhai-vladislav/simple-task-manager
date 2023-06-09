import { Body, Controller, HttpStatus, Put } from '@nestjs/common';
import { TaskService } from '../services/Task';
import { UpdateCheckListItemsDto } from '../dtos/CheckListItem';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CheckListItem } from '../types/Task';
import { JWT_BEARER_SWAGGER_AUTH_NAME } from '../utils/constants';

@ApiTags('Checklist')
@Controller('/checklist')
export class ChecklistController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({
    description: 'Endpoint for updating chacklist items.',
    operationId: 'signupAction',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The checklist items successfully created.',
    type: [CheckListItem],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "The checklist items wasn't created, or something went wrong.",
  })
  @ApiBearerAuth(JWT_BEARER_SWAGGER_AUTH_NAME)
  @Put()
  public async updateChecklistItems(
    @Body() updateChecklistItemsDto: UpdateCheckListItemsDto,
  ): Promise<CheckListItem[]> {
    return this.taskService.updateChecklistItems(updateChecklistItemsDto.items);
  }
}

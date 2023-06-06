import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CheckListItemDto, UpdateCheckListItemDto } from './CheckListItem';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  authorId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  description?: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({ nullable: true, type: [CheckListItemDto] })
  checkListItems?: CheckListItemDto[];
}

export class UpdateTaskDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  description?: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({ nullable: true, type: [UpdateCheckListItemDto] })
  checkListItems?: UpdateCheckListItemDto[];
}

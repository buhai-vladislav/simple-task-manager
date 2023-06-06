import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export enum OperationType {
  REMOVE = 'remove',
  UPDATE = 'update',
  ADD = 'add',
}

export class CheckListItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

export class UpdateCheckListItemDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  title?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ nullable: true })
  completed?: boolean;

  @IsOptional()
  @IsEnum(OperationType)
  @ApiProperty({ nullable: true, enum: OperationType })
  type?: OperationType;
}

export class CreateChecklistItemsDto {
  @ValidateNested()
  @IsArray()
  @ApiProperty({ type: [CheckListItemDto] })
  items: CheckListItemDto[];
}

export class UpdateCheckListItemsDto {
  @IsArray()
  @ValidateNested()
  @ApiProperty({ type: [UpdateCheckListItemDto] })
  items: UpdateCheckListItemDto[];
}

export class DeleteCheckListItemsDto {
  @ApiProperty({ description: 'Array of ids for removing.', type: [String] })
  ids: string[];
}

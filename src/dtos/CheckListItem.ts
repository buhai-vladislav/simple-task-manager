import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CheckListItemDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

export class UpdateCheckListItemDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

export class CreateChecklistItemsDto {
  @ValidateNested()
  @IsArray()
  items: CheckListItemDto[];
}

export class UpdateCheckListItemsDto {
  @IsArray()
  @ValidateNested()
  items: UpdateCheckListItemDto[];
}

export class DeleteCheckListItemsDto {
  ids: string[];
}

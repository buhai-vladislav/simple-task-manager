import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RestePasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsUUID()
  @IsNotEmpty()
  id: string;
}

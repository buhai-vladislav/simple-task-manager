import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ nullable: true })
  fullname?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ nullable: true })
  email?: string;
}

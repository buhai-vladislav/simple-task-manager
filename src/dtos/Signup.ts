import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    description: 'The fullname of the new user.',
  })
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({
    description: 'The email of the new user.',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the new user.',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

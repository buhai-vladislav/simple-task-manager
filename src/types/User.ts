import { ApiProperty } from '@nestjs/swagger';

class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export { User };

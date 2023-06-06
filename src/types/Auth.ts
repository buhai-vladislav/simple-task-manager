import { TokenPair } from './TokenPair';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './User';

class SigninResponse extends TokenPair {
  @ApiProperty({
    description: 'User instance',
    type: User,
  })
  user: Partial<User>;
}

export { SigninResponse };

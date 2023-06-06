import { User } from '@prisma/client';
import { TokenPair } from './TokenPair';

class SigninResponse extends TokenPair {
  user: Partial<User>;
}

export { SigninResponse };

import { User } from '@prisma/client';
import type { ITokenPair } from './TokenPair';

interface ISigninResponse extends ITokenPair {
  user: Partial<User>;
}

export type { ISigninResponse };

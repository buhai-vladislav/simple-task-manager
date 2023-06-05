import { IUser } from './User';

interface ISignup {
  email: string;
  password: string;
  fullname: string;
}

interface ILogin {
  password: string;
  email: string;
}

interface IResetPassword {
  password: string;
  token: string;
}

interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

interface ILoginResponse extends ITokenPair {
  user: IUser;
}

export type { ISignup, ILogin, IResetPassword, ITokenPair, ILoginResponse };

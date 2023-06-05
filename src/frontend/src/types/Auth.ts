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

export type { ISignup, ILogin, IResetPassword };

interface ISignup {
  email: string;
  password: string;
  fullname: string;
}

interface ILogin {
  password: string;
  email: string;
}

export type { ISignup, ILogin }
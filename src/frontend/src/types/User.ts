interface IUser {
  id: string;
  fullname: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IUpdateUser {
  fullname?: string;
  email?: string;
}

export type { IUser, IUpdateUser };

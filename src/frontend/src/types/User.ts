interface IUser {
  id: string;
  fullname: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IUpdateUser {
  fullname?: string;
  email?: string;
}

export type { IUser, IUpdateUser };

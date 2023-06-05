import axios from '../../api-instance';
import { useMutation } from '@tanstack/react-query';
import type { ILogin, ILoginResponse } from '../../../types/Auth';

const loginAction = async (data: ILogin) => {
  return await axios.post<ILoginResponse>('/auth/signin', data);
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (data: ILogin) => loginAction(data),
  });
};

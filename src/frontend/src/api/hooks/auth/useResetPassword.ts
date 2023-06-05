import { IResetPassword } from '../../../types/Auth';
import axios from '../../api-instance';
import { useMutation } from '@tanstack/react-query';

const resetPasswordAction = async ({ password, token }: IResetPassword) => {
  return await axios.put<string>(`/auth/reset-password?token=${token}`, {
    password,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationKey: ['reset-pass'],
    mutationFn: (data: IResetPassword) => resetPasswordAction(data),
  });
};

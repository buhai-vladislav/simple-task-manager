import { ISignup } from '../../../types/Auth';
import axios from '../../api-instance';
import { useMutation } from '@tanstack/react-query';

const signupAction = async (data: ISignup) => {
  return await axios.post<string>('/auth/signup', data);
};

export const useSignup = () => {
  return useMutation({
    mutationKey: ['signup'],
    mutationFn: (data: ISignup) => signupAction(data),
  });
};

import axios from '../../api-instance';
import { useMutation } from '@tanstack/react-query';

const forgotPasswordAction = async (email: string) => {
  return await axios.post('/auth/forgot-password', { email });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: ['forgot-pass'],
    mutationFn: (email: string) => forgotPasswordAction(email),
  });
};

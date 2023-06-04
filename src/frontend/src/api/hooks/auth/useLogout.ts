import { useNavigate } from 'react-router-dom';
import axios from '../../api-instance';
import { useMutation } from '@tanstack/react-query';

const logoutAction = async () => {
  const token = localStorage.getItem('refresh-token');
  return await axios.post(`/auth/logout/${token}`);
};

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logoutAction,
    onSuccess: () => {
      localStorage.clear();
      navigate('/login');
    },
  });
};

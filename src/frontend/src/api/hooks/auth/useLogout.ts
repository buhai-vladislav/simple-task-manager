import { useNavigate } from 'react-router-dom';
import axios from '../../api-instance';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../../../store';
import { setMenuKey } from '../../../store/reducers/navigation';

const logoutAction = async () => {
  const token = localStorage.getItem('refresh-token');
  return await axios.post(`/auth/logout/${token}`);
};

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logoutAction,
    onSuccess: () => {
      localStorage.clear();
      dispatch(setMenuKey('index'));
      navigate('/login');
    },
  });
};

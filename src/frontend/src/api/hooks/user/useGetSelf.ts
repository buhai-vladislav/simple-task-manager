import { IUser } from '../../../types/User';
import axios from '../../api-instance';
import { useQuery } from '@tanstack/react-query';

const getSelfAction = async () => {
  return await axios.get<IUser>('/users/myself');
};

export const useGetSelf = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getSelfAction,
  });
};

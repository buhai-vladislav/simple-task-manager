import { IGetTasks, IGetTasksResponse } from '../../../types/Task';
import axios from '../../api-instance';
import { useQuery } from '@tanstack/react-query';

const getTasksAction = async (params: IGetTasks) => {
  return await axios.get<IGetTasksResponse>(`/tasks`, { params });
};

export const useGetTasks = (params: IGetTasks) => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasksAction(params),
  });
};

import { ICreateTask } from '../../../types/Task';
import axios from '../../api-instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const createTaskAction = async (body: ICreateTask) => {
  return await axios.post('/tasks', body);
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-task'],
    mutationFn: (body: ICreateTask) => createTaskAction(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });
};

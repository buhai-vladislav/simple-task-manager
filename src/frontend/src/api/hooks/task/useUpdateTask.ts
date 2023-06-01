import { ITask, IUpdateTask } from '../../../types/Task';
import axios from '../../api-instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const updateTaskAction = async (body: IUpdateTask) => {
  return await axios.put('/tasks', body);
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-task'],
    mutationFn: (body: IUpdateTask) => updateTaskAction(body),
    onSuccess: (_data, variables) => {
      const { id, ...newData } = variables;
      queryClient.setQueryData(['tasks'], (oldData: any) =>
        oldData
          ? {
              ...oldData,
              data: {
                ...oldData?.data,
                tasks: oldData?.data?.tasks?.map((item: ITask) =>
                  item?.id === variables?.id ? { ...item, ...newData } : item,
                ),
              },
            }
          : oldData,
      );
    },
  });
};

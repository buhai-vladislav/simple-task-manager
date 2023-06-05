import { ITask, IUpdateTask } from '../../../types/Task';
import axios from '../../api-instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const updateTaskAction = async (body: IUpdateTask) => {
  return await axios.put<ITask>('/tasks', body);
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-task'],
    mutationFn: (body: IUpdateTask) => updateTaskAction(body),
    onSuccess: (data, variables) => {
      const { id } = variables;
      queryClient.setQueryData(['tasks'], (oldData: any) =>
        oldData
          ? {
              ...oldData,
              data: {
                ...oldData?.data,
                tasks: oldData?.data?.tasks?.map((item: ITask) =>
                  item?.id === id
                    ? {
                        ...data.data,
                      }
                    : item,
                ),
              },
            }
          : oldData,
      );
    },
  });
};

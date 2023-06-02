import { ITask, IUpdateChecklistItem } from '../../../types/Task';
import axios from '../../api-instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const updateChecklistItemAction = async (data: IUpdateChecklistItem) => {
  return await axios.put('/checklist', { items: [data] });
};

export const useUpdateChecklistItem = (taskId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['checklist-items'],
    mutationFn: (data: IUpdateChecklistItem) => updateChecklistItemAction(data),
    onSuccess: (_data, variables) => {
      const { id, completed } = variables;
      queryClient.setQueryData(['tasks'], (oldData: any) =>
        oldData
          ? {
              ...oldData,
              data: {
                ...oldData?.data,
                tasks: oldData?.data?.tasks?.map((item: ITask) =>
                  item?.id === taskId
                    ? {
                        ...item,
                        checklistItems: item?.checklistItems?.map((item) =>
                          item.id === id ? { ...item, completed } : item,
                        ),
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

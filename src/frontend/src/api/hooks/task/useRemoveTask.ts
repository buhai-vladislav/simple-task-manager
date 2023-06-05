import axios from '../../api-instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const removeTaskAction = async (id: string) => {
  return await axios.delete<boolean>(`/tasks/${id}`);
};

export const useRemoveTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => removeTaskAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

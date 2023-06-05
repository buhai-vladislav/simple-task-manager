import { IUpdateUser, IUser } from '../../../types/User';
import axios from '../../api-instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const updateUserAction = async (data: IUpdateUser) => {
  return await axios.put<IUser>(`/users`, data);
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-user'],
    mutationFn: (data: IUpdateUser) => updateUserAction(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], (oldData: any) =>
        oldData
          ? {
              ...oldData,
              data: {
                ...oldData.data,
                ...data.data,
              },
            }
          : oldData,
      );
    },
  });
};

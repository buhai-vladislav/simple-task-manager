import { useState, useEffect, useCallback, ReactNode } from 'react';
import { UseMutateAsyncFunction } from '@tanstack/react-query';

import { useGetTasks, useRemoveTask } from '../../../api/hooks';
import useDebounce from '../../../hooks/useDebounce';
import { ClbType, useToast } from '../../../hooks/useToast';
import { OrderBy } from '../../../types/Task';
import { ModalType } from '../components/TaskModal';

import type { AxiosResponse } from 'axios';
import type { Dispatch, SetStateAction, ChangeEvent } from 'react';
import type { IGetTasksResponse, ITask } from '../../../types/Task';

type UseTaskBoard = [
  AxiosResponse<IGetTasksResponse, any> | undefined,
  number,
  boolean,
  ITask | undefined,
  ModalType,
  ReactNode,
  boolean,
  boolean,
  ClbType,
  Dispatch<SetStateAction<number>>,
  UseMutateAsyncFunction<AxiosResponse<boolean, any>, unknown, string, unknown>,
  ({ target }: ChangeEvent<HTMLInputElement>) => void,
  () => void,
  () => void,
  (id: string, type?: ModalType) => () => void,
  () => void,
];

const useTaskBoard = (): UseTaskBoard => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<ITask | undefined>(undefined);
  const [type, setType] = useState<ModalType>(ModalType.VIEW);
  const [contextHolder, openNotification] = useToast('bottom');
  const debouncedSearch = useDebounce(search);

  const {
    data: tasks,
    isFetching,
    refetch: getTasks,
  } = useGetTasks({
    page,
    limit: 9,
    search: debouncedSearch,
    orderBy: OrderBy.DESC,
  });
  const { mutateAsync: removeTask, isLoading: isRemoving } = useRemoveTask();

  useEffect(() => {
    getTasks();
  }, [page, debouncedSearch]);

  const onSearchChnage = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setSearch(target.value);
    },
    [],
  );
  const openModal = useCallback(() => {
    setOpen(true);
  }, []);
  const handleOk = useCallback(() => {
    setOpen(false);
    setItem(undefined);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
    setItem(undefined);
  }, []);
  const handleItemClick = useCallback(
    (id: string, type: ModalType = ModalType.VIEW) =>
      () => {
        const task = tasks?.data.tasks.find((task) => task.id === id);
        setType(type);
        setItem(task);
        openModal();
      },
    [tasks?.data.tasks],
  );
  const createTaskHandler = useCallback(() => {
    setType(ModalType.CREATE);
    openModal();
  }, []);

  return [
    tasks,
    page,
    open,
    item,
    type,
    contextHolder,
    isFetching,
    isRemoving,
    openNotification,
    setPage,
    removeTask,
    onSearchChnage,
    handleOk,
    handleClose,
    handleItemClick,
    createTaskHandler,
  ];
};

export { useTaskBoard };
export type { UseTaskBoard };

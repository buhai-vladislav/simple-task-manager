import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useGetTasks, useRemoveTask } from '../../api/hooks';
import { TaskBoardWrapper } from './TaskBoard.presets';
import { TaskCard } from './components/TaskCard';
import { Button, Input, Pagination, Spin } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import useDebounce from '../../hooks/useDebounce';
import { ModalType, TaskModal } from './components/TaskModal';
import { ITask, OrderBy } from '../../types/Task';
import { useToast } from '../../hooks/useToast';

export const TaskBoard = () => {
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

  return (
    <TaskBoardWrapper>
      {contextHolder}
      <div className="header">
        <Input
          placeholder="Type your search value"
          onChange={onSearchChnage}
          prefix
        />
        <Button icon={<PlusSquareOutlined />} onClick={createTaskHandler} />
      </div>
      <div className="body">
        {tasks?.data?.tasks && tasks?.data?.tasks?.length > 0 ? (
          <div className="items">
            {isFetching ? (
              <Spin size="large" />
            ) : (
              tasks?.data?.tasks?.map(
                ({ title, description, id, createdAt }) => (
                  <TaskCard
                    key={id}
                    title={title}
                    description={description}
                    createdAt={createdAt}
                    onClick={handleItemClick(id)}
                    actions={[
                      {
                        key: 1,
                        label: 'Update',
                        onClick: (event) => {
                          event.domEvent.stopPropagation();
                          handleItemClick(id, ModalType.EDIT)();
                        },
                      },
                      {
                        key: 2,
                        label: 'Remove',
                        danger: true,
                        disabled: isRemoving,
                        onClick: async (event) => {
                          event.domEvent.stopPropagation();
                          await removeTask(id);
                          if (tasks.data.tasks.length === 1) {
                            setPage((prev) => (prev !== 1 ? prev - 1 : 1));
                          }
                        },
                      },
                    ]}
                  />
                ),
              )
            )}
          </div>
        ) : (
          <span>No tasks to show...</span>
        )}
        {tasks?.data.pagination.count ? (
          <Pagination
            defaultCurrent={page}
            pageSize={9}
            total={tasks.data.pagination.count}
            onChange={(page) => setPage(page)}
            disabled={isFetching}
          />
        ) : null}
        <TaskModal
          open={open}
          onOk={handleOk}
          onCancel={handleClose}
          type={type}
          id={item?.id}
          title={item?.title}
          description={item?.description}
          createdAt={item?.createdAt}
          checklistItems={item?.checklistItems}
          openNotification={openNotification}
        />
      </div>
    </TaskBoardWrapper>
  );
};

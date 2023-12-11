import { TaskBoardWrapper } from './TaskBoard.presets';
import { TaskCard } from './components/TaskCard';
import { Button, Input, Pagination, Spin } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import { ModalType, TaskModal } from './components/TaskModal';
import { UseTaskBoard, useTaskBoard } from './hooks/useTaskBoard';

export const TaskBoard = () => {
  const [
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
  ]: UseTaskBoard = useTaskBoard();

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
                ({ title, description, id, createdAt, checklistItems }) => (
                  <TaskCard
                    key={id}
                    title={title}
                    description={description}
                    createdAt={createdAt}
                    onClick={handleItemClick(id)}
                    completed={
                      checklistItems?.length
                        ? checklistItems?.every(({ completed }) => completed)
                        : false
                    }
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
          modalType={type}
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

import { FC, useMemo } from 'react';
import type { ITaskCardProps } from './TaskCard.props';
import { TaskCardWrapper } from './TaskCard.presets';
import { getFormattedTime } from './TaskCard.helper';
import { Button, Dropdown } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';

export const TaskCard: FC<ITaskCardProps> = ({
  description,
  title,
  createdAt,
  actions,
  onClick,
}) => {
  const actionButton = useMemo(
    () => (
      <Dropdown menu={{ items: actions }} trigger={['click']}>
        <Button
          icon={<UnorderedListOutlined />}
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
      </Dropdown>
    ),
    [actions],
  );
  return (
    <TaskCardWrapper onClick={onClick}>
      <div className="head">
        <h3>{title}</h3>
        {actions && actionButton}
      </div>
      <div className="body">
        <p>{description}</p>
      </div>
      <div className="footer">
        <span>{getFormattedTime(createdAt)}</span>
      </div>
    </TaskCardWrapper>
  );
};

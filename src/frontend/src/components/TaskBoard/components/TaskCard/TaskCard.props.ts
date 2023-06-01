import { MenuProps } from 'antd';

interface ITaskCardProps {
  title: string;
  description: string;
  createdAt: Date;
  onClick: () => void;
  actions?: MenuProps['items'];
}

export type { ITaskCardProps };

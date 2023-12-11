import { Menu } from 'antd';
import { FC } from 'react';
import {
  ContainerOutlined,
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

import { useHeader } from './hooks/useHeader';

import type { MenuProps } from 'antd';
import type { INavigation } from './Header.props';

const indexItems: MenuProps['items'] = [
  {
    label: 'Login',
    key: 'login',
    icon: <LoginOutlined />,
  },
  {
    label: 'Signup',
    key: 'signup',
    icon: <UserAddOutlined />,
  },
];

const loggedInItems: MenuProps['items'] = [
  {
    label: 'Logout',
    key: 'logout',
    icon: <UserAddOutlined />,
  },
  {
    label: 'Profile',
    key: 'profile',
    icon: <UserAddOutlined />,
  },
  {
    label: 'Tasks',
    key: 'task-manager',
    icon: <ContainerOutlined />,
  },
];

const navigation: INavigation = {
  index: indexItems,
  loggedIn: loggedInItems,
};

export const Header: FC = () => {
  const [key, location, changeHandler] = useHeader();

  return (
    <Menu
      mode="horizontal"
      items={navigation[key]}
      selectedKeys={[location]}
      onClick={changeHandler}
      style={{ justifyContent: 'flex-end' }}
      theme="light"
    />
  );
};

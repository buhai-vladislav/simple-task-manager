import { Menu } from 'antd';
import {
  ContainerOutlined,
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { setLocation } from '../../store/reducers/navigation';
import type { INavigation } from './Header.props';
import { FC, useEffect } from 'react';
import type { MenuProps } from 'antd';

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
  const { key, location } = useAppSelector((state) => state.navigation);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname) {
      dispatch(setLocation(pathname.replaceAll('/', '')));
    }
  }, [pathname]);

  const changeHandler: MenuProps['onClick'] = ({ key }) => {
    dispatch(setLocation(key));
    navigate(`/${key}`);
  };

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

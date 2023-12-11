import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store';
import { setLocation } from '../../../store/reducers/navigation';

import type { MenuProps } from 'antd';

const useHeader = (): [string, string, MenuProps['onClick']] => {
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
    navigate(`/${key}`, { state: location });
  };

  return [key, location, changeHandler];
};

export { useHeader };

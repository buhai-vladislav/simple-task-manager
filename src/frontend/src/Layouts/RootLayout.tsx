import { Outlet, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import { Header } from '../components/Header';
import { useAppDispatch, useAppSelector } from '../store';
import { useGetSelf } from '../api/hooks';
import { useEffect } from 'react';
import { setUser } from '../store/reducers/user';
import { setLocation, setMenuKey } from '../store/reducers/navigation';

function RootLayout() {
  const { data } = useGetSelf();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && data?.data) {
      dispatch(setUser(data.data));
      dispatch(setMenuKey('loggedIn'));
      dispatch(setLocation('task-manager'));
      navigate('/task-manager');
    }
  }, [data, user]);

  return (
    <Layout>
      <Header />
      <Layout.Content
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 46px)',
          backgroundColor: '#fff',
        }}
      >
        <Outlet />
      </Layout.Content>
    </Layout>
  );
}

export default RootLayout;

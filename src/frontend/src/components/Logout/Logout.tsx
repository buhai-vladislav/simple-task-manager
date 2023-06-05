import { Button } from 'antd';
import { LogoutWrapper } from './Logout.presets';
import { useLogout } from '../../api/hooks';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Logout = () => {
  const { isLoading, mutateAsync: logout } = useLogout();
  const { state } = useLocation();
  const navigate = useNavigate();

  const logoutHanlder = useCallback(async () => {
    await logout();
  }, []);
  const returnHandler = useCallback(() => {
    const path = state === null ? 'task-manager' : state;
    navigate(`/${path}`);
  }, [state]);

  return (
    <LogoutWrapper>
      <h2>Logout?)</h2>
      <Button.Group size="large" className="buttons">
        <Button danger block disabled={isLoading} onClick={returnHandler}>
          Cancel
        </Button>
        <Button
          type="primary"
          block
          disabled={isLoading}
          loading={isLoading}
          onClick={logoutHanlder}
        >
          Ok
        </Button>
      </Button.Group>
    </LogoutWrapper>
  );
};

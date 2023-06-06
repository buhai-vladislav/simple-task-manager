import { Button } from 'antd';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeWrapper } from './Home.presets';

export const Home = () => {
  const navigate = useNavigate();
  const navigateHandler = useCallback(() => {
    navigate('/login');
  }, []);

  return (
    <HomeWrapper>
      <h1>Welcome to the Simple Task Manager!)</h1>
      <Button onClick={navigateHandler} type="link">
        Already have an account?
      </Button>
    </HomeWrapper>
  );
};

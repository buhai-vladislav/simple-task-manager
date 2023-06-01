import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../Layouts/RootLayout';
import { Signup } from '../components/Sigup';
import { Login } from '../components/Login';
import { TaskBoard } from '../components/TaskBoard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <></>,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/task-manager',
        element: <TaskBoard />,
      },
      {
        path: '/task-manager/:id',
        element: <></>,
      },
      {
        path: '/profile',
        element: <></>,
      },
    ],
  },
]);

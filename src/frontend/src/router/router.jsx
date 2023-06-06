import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../Layouts/RootLayout';
import { Signup } from '../components/Sigup';
import { Login } from '../components/Login';
import { TaskBoard } from '../components/TaskBoard';
import { Logout } from '../components/Logout';
import { ForgotPassword } from '../components/ForgotPassword';
import { ResetPassword } from '../components/ResetPassword';
import { Profile } from '../components/Profile';
import { Home } from '../components/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
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
        element: <Profile />,
      },
      {
        path: '/logout',
        element: <Logout />,
      },
      {
        path: '/reset-password',
        element: <ResetPassword />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
    ],
  },
]);

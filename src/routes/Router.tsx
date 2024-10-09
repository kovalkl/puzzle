import { Navigate, createBrowserRouter } from 'react-router-dom';

import Root from '@/routes/Root';
import LoginPage from '@/views/LoginPage/LoginPage';

const isAuth = false;

const router = createBrowserRouter([
  {
    path: '/',
    element: isAuth ? <Root /> : <Navigate to='/login' />,
  },
  {
    path: '/login',
    element: !isAuth ? <LoginPage /> : <Navigate to='/' />,
  },
]);

export { router };

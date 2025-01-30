import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '@/components/Layout/Layout';
import { PrivateRoute } from '@/components/PrivateRoute/PrivateRoute';
import { paths } from '@/constants/paths';
import { GreetingPage } from '@/views/GreetingPage/GreetingPage';
import { LoginPage } from '@/views/LoginPage/LoginPage';

const router = createBrowserRouter([
  {
    path: paths.ROOT,
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
  },
  {
    path: `/${paths.LOGIN}`,
    element: <LoginPage />,
  },
  {
    path: `/${paths.GREETING}`,
    element: (
      <PrivateRoute>
        <GreetingPage />
      </PrivateRoute>
    ),
  },
]);

export { router };

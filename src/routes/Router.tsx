import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '@/components/Layout/Layout';
import { paths } from '@/constants/paths';
import { GreetingPage } from '@/views/GreetingPage/GreetingPage';
import { LoginPage } from '@/views/LoginPage/LoginPage';

const router = createBrowserRouter([
  {
    path: paths.ROOT,
    element: <Layout />,
  },
  {
    path: `/${paths.LOGIN}`,
    element: <LoginPage />,
  },
  {
    path: `/${paths.GREETING}`,
    element: <GreetingPage />,
  },
]);

export { router };

import { createBrowserRouter } from 'react-router-dom';

import { paths } from '@/constants/paths';
import { Root } from '@/routes/Root';
import { GreetingPage } from '@/views/GreetingPage/GreetingPage';
import { LoginPage } from '@/views/LoginPage/LoginPage';

const router = createBrowserRouter([
  {
    path: paths.ROOT,
    element: <Root />,
    children: [],
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

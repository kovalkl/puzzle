import { createBrowserRouter } from 'react-router-dom';

import { Greeting } from '@/components/Greeting/Greeting';
import { paths } from '@/constants/paths';
import { Root } from '@/routes/Root';
import { LoginPage } from '@/views/LoginPage/LoginPage';

const router = createBrowserRouter([
  {
    path: paths.ROOT,
    element: <Root />,
    children: [
      {
        path: paths.GREETING,
        element: <Greeting />,
      },
    ],
  },
  {
    path: `/${paths.LOGIN}`,
    element: <LoginPage />,
  },
]);

export { router };

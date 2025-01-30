import { Navigate } from 'react-router-dom';

import { paths } from '@/constants/paths';
import { useAppSelector } from '@/store/hooks';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const currentUser = useAppSelector((state) => state.userProgress.currentUser);

  return currentUser ? children : <Navigate to={`/${paths.LOGIN}`} />;
};

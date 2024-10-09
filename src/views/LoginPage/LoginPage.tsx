import { Backdrop } from '@/components/Backdrop/Backdrop';
import { Login } from '@/components/Login/Login';

import styles from '@/views/LoginPage/LoginPage.module.sass';

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <Backdrop />
      <Login />
    </div>
  );
};

export default LoginPage;

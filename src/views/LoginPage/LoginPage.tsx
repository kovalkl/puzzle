import { Login } from '@/components/Login/Login';

import styles from '@/views/LoginPage/LoginPage.module.sass';

export const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <Login />
    </div>
  );
};

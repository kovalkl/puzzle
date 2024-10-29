import { Outlet } from 'react-router-dom';

import { Header } from '@/components/Header/Header';

import styles from '@/components/Layout/Layout.module.sass';

export const Layout = () => {
  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

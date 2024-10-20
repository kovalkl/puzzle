import { useSelector } from 'react-redux';

import { Logout } from '@/components/UI/Icons/Logout';

import styles from '@/components/Header/Header.module.sass';

export const Header = () => {
  const { userName } = useSelector((state) => state.userProgress.userName);

  return (
    <header className={styles.header}>
      <div className={`${styles.header__wrapper} container`}>
        <a className={styles.header__title}>English Puzzle</a>
        <div className={styles.header__user}>
          <span>{userName || 'Mock User'}</span>
          <Logout />
        </div>
      </div>
    </header>
  );
};

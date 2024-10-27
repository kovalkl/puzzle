import { StageSelector } from '@/components/Header/components/StageSelector/StageSelector';
import { Logout } from '@/components/UI/Icons/Logout';
import { useAppSelector } from '@/store/hooks';

import styles from '@/components/Header/Header.module.sass';

export const Header = ({ isGreetingPage }: { isGreetingPage?: boolean }) => {
  const { userName } = useAppSelector((state) => state.userProgress);

  return (
    <header className={styles.header}>
      <div className={`${styles.header__wrapper} container`}>
        <a className={styles.header__title}>English Puzzle</a>
        {!isGreetingPage && <StageSelector />}
        <div className={styles.header__user}>
          <span>{userName}</span>
          <Logout />
        </div>
      </div>
    </header>
  );
};

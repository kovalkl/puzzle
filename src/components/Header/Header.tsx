import { useNavigate } from 'react-router-dom';

import { StageSelector } from '@/components/Header/components/StageSelector/StageSelector';
import { Logout } from '@/components/UI/Icons/Logout';
import { paths } from '@/constants/paths';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logoutUser } from '@/store/userProgressSlice';

import styles from '@/components/Header/Header.module.sass';

export const Header = ({ isGreetingPage }: { isGreetingPage?: boolean }) => {
  const currentUser = useAppSelector((state) => state.userProgress.currentUser);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(logoutUser());
    navigate(`/${paths.LOGIN}`);
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.header__wrapper} container`}>
        <a className={styles.header__title}>English Puzzle</a>
        {!isGreetingPage && <StageSelector />}
        <div className={styles.header__user}>
          <span className={styles.header__userName}>{currentUser}</span>
          <div onClick={() => logout()}>
            <Logout />
          </div>
        </div>
      </div>
    </header>
  );
};

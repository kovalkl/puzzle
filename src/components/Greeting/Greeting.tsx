import { useNavigate } from 'react-router-dom';

import { Backdrop } from '@/components/Backdrop/Backdrop';
import Button from '@/components/UI/Button/Button';
import { useAppSelector } from '@/store/hooks';

import styles from '@/components/Greeting/Greeting.module.sass';

export const Greeting = () => {
  const { userName } = useAppSelector((state) => state.userProgress);
  const navigate = useNavigate();

  return (
    <div className={styles.greeting}>
      <Backdrop />
      <div className={`${styles.greeting__wrapper} container`}>
        <p className={styles.greeting__title}>Hello, {userName}!</p>
        <p>
          Click on words, collect phrases. Select tooltips in the menu. Words
          can be drag and drop
        </p>
        <Button onClick={() => navigate('/')}>Start</Button>
      </div>
    </div>
  );
};

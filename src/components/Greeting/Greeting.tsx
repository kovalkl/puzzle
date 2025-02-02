import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SquareLoader } from 'react-spinners';

import { Backdrop } from '@/components/Backdrop/Backdrop';
import Button from '@/components/UI/Button/Button';
import { useAppSelector } from '@/store/hooks';

import styles from '@/components/Greeting/Greeting.module.sass';

export const Greeting = () => {
  const [loading, setLoading] = useState(true);
  const [bgImage, setBgImage] = useState<string | null>(null);
  const currentUser = useAppSelector((state) => state.userProgress.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const img = new Image();
    img.src = '/background.jpg';
    img.onload = () => {
      setBgImage(img.src);
      setLoading(false);
    };
  }, []);

  return (
    <div
      className={styles.greeting}
      style={{ backgroundImage: bgImage ? `url(${bgImage})` : 'none' }}
    >
      <SquareLoader color='#fff' size={50} loading={loading} />

      {!loading && (
        <>
          <Backdrop />
          <div className={`${styles.greeting__wrapper} container`}>
            <p className={styles.greeting__title}>Hello, {currentUser}!</p>
            <p>
              Click on words, collect phrases. Select tooltips in the menu.
              Words can be drag and drop
            </p>
            <Button onClick={() => navigate('/')}>Start</Button>
          </div>
        </>
      )}
    </div>
  );
};

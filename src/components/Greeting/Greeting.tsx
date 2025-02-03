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
            <ul>
              <li>Click on words to form correct phrases</li>
              <li>Use hints in the menu if needed</li>
              <li>Words can be dragged and dropped</li>
            </ul>
            <p>Ready to start?</p>
            <Button onClick={() => navigate('/')}>Start</Button>
          </div>
        </>
      )}
    </div>
  );
};

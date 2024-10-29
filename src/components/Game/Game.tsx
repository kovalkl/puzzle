import { useEffect } from 'react';

import { GameField } from '@/components/Game/components/GameField/GameField';
import { WordBank } from '@/components/Game/components/WordBank/WordBank';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchImage, getLevelData } from '@/store/roundSlice';

import styles from '@/components/Game/Game.module.sass';

export const Game = () => {
  const dispatch = useAppDispatch();
  const imageSrc = useAppSelector(getLevelData)?.imageSrc;

  useEffect(() => {
    if (imageSrc) {
      dispatch(fetchImage({ imageSrc }));
    }
  }, [dispatch, imageSrc]);

  const fetchedImage = useAppSelector((state) => state.round.imageUrl);

  return (
    <div className='container'>
      <div className={styles.game__wrapper}>
        <GameField imageSrc={fetchedImage || ''} />
        <WordBank imageSrc={fetchedImage || ''} />
      </div>
    </div>
  );
};

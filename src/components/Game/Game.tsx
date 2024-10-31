import { useEffect } from 'react';

import { ActionButtons } from '@/components/Game/components/ActionButtons/ActionButtons';
import { GameField } from '@/components/Game/components/GameField/GameField';
import { WordBank } from '@/components/Game/components/WordBank/WordBank';
import { fetchImage } from '@/store/gameImageSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLevelData } from '@/store/selectors';

import styles from '@/components/Game/Game.module.sass';

export const Game = () => {
  const dispatch = useAppDispatch();
  const imageSrc = useAppSelector(getLevelData)?.imageSrc;

  useEffect(() => {
    if (imageSrc) {
      dispatch(fetchImage({ imageSrc }));
    }
  }, [dispatch, imageSrc]);

  const fetchedImage = useAppSelector((state) => state.gameImage.imageUrl);

  return (
    <div className='container'>
      <div className={styles.game__wrapper}>
        <GameField imageSrc={fetchedImage || ''} />
        <WordBank imageSrc={fetchedImage || ''} />
        <ActionButtons />
      </div>
    </div>
  );
};

import { useEffect } from 'react';

import { ActionButtons } from '@/components/Game/components/ActionButtons/ActionButtons';
import { GameField } from '@/components/Game/components/GameField/GameField';
import { HintsBlock } from '@/components/Game/components/HintsBlock/HintsBlock';
import { Translation } from '@/components/Game/components/Translation/Translation';
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
    <div className={`${styles.game} container`}>
      <div className={styles.game__wrapper}>
        <HintsBlock />
        <GameField imageSrc={fetchedImage || ''} />
        <Translation />
        <WordBank imageSrc={fetchedImage || ''} />
        <ActionButtons />
      </div>
    </div>
  );
};

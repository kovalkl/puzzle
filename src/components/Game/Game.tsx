import { useEffect, useMemo } from 'react';
import { shallowEqual } from 'react-redux';

import { ActionButtons } from '@/components/Game/components/ActionButtons/ActionButtons';
import { DragAndDropProvider } from '@/components/Game/components/DragAndDropProvider/DragAndDropProvider';
import { HintsBlock } from '@/components/Game/components/HintsBlock/HintsBlock';
import { TranslationBlock } from '@/components/Game/components/TranslationBlock/TranslationBlock';
import { fetchImage } from '@/store/gameImageSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLevelData } from '@/store/selectors';

import styles from '@/components/Game/Game.module.sass';

export const Game = () => {
  const dispatch = useAppDispatch();

  const { isShowLevelInfo, puzzles } = useAppSelector(
    (state) => state.puzzleInteraction,
    shallowEqual,
  );
  const puzzlesIds = useMemo(() => puzzles.map((p) => p.id), [puzzles]);

  const imageSrc = useAppSelector(getLevelData)?.imageSrc || '';

  useEffect(() => {
    if (imageSrc !== '') {
      dispatch(fetchImage({ imageSrc }));
    }
  }, [dispatch, imageSrc]);

  const imageUrl = useAppSelector((state) => state.gameImage.imageUrl) || '';

  return (
    <div className={styles.game}>
      <div className={styles.game__wrapper}>
        <HintsBlock />
        <DragAndDropProvider
          imageUrl={imageUrl}
          puzzles={puzzles}
          puzzlesIds={puzzlesIds}
        >
          <div className={styles.game__translation}>
            {!isShowLevelInfo && <TranslationBlock />}
          </div>
        </DragAndDropProvider>
        <ActionButtons />
      </div>
    </div>
  );
};

import { useEffect } from 'react';

import { CenteredLoader } from '@/components/Game/components/CenteredLoader/CenteredLoader';
import { LevelInfo } from '@/components/Game/components/LevelInfo/LevelInfo';
import { WordList } from '@/components/Game/components/WordList/WordList';
import { setCheckButtonDisabled } from '@/store/actionButtonSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLevelData } from '@/store/selectors';
import { PuzzleType } from '@/store/types';

import styles from '@/components/Game/components/WordBank/WordBank.module.sass';

type WordBankProps = {
  imageSrc: string;
  puzzles: PuzzleType[];
  puzzlesIds: number[];
  isLoaded: boolean;
};

export const WordBank = ({
  imageSrc,
  puzzles,
  puzzlesIds,
  isLoaded,
}: WordBankProps) => {
  const dispatch = useAppDispatch();
  const { author, name, year } = useAppSelector(getLevelData) || {};
  const { isShowLevelInfo } = useAppSelector(
    (state) => state.puzzleInteraction,
  );

  const puzzlesOnWordBank = puzzles.filter(
    (puzzle) => puzzle.wordList === 'wordBank',
  );

  useEffect(() => {
    if (!puzzlesOnWordBank.length) {
      dispatch(setCheckButtonDisabled(false));
    } else {
      dispatch(setCheckButtonDisabled(true));
    }
  }, [puzzlesOnWordBank.length, dispatch]);

  return (
    <div className={styles.wordBank}>
      {isShowLevelInfo ? (
        <LevelInfo author={author!} name={name!} year={year!} />
      ) : isLoaded ? (
        <WordList
          puzzlesIds={puzzlesIds}
          type='wordBank'
          puzzles={puzzlesOnWordBank}
          imageSrc={imageSrc}
        />
      ) : (
        <CenteredLoader />
      )}
    </div>
  );
};

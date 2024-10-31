import { useEffect } from 'react';

import { WordItem } from '@/components/Game/components/WordItem/WordItem';
import { movePuzzleToGameField, setPuzzles } from '@/store/gameStatusSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getSentence } from '@/store/selectors';
import { PuzzleType } from '@/store/types';

import styles from '@/components/Game/components/WordBank/WordBank.module.sass';

type WordBankProps = {
  imageSrc: string;
};

export const WordBank = ({ imageSrc }: WordBankProps) => {
  const dispatch = useAppDispatch();
  const sentenceArray = useAppSelector(getSentence);
  const puzzles = useAppSelector((state) => state.gameStatus.puzzles);

  useEffect(() => {
    dispatch(setPuzzles(sentenceArray));
  }, [dispatch, sentenceArray]);

  const onMovePuzzleToGameField = (puzzle: PuzzleType) => {
    dispatch(movePuzzleToGameField(puzzle));
  };

  return (
    <div className={styles.wordBank}>
      <div className={styles.wordBank__wrapper}>
        {Boolean(puzzles) &&
          puzzles.map((puzzle) => (
            <WordItem
              key={puzzle.id}
              wordData={puzzle}
              imageSrc={imageSrc}
              onMovePuzzle={() => onMovePuzzleToGameField(puzzle)}
            />
          ))}
      </div>
    </div>
  );
};

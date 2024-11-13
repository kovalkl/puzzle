import { useEffect } from 'react';

import { WordItem } from '@/components/Game/components/WordItem/WordItem';
import {
  activateCheckButton,
  deactivateCheckButton,
} from '@/store/actionButtonSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  movePuzzleToGameField,
  setPuzzles,
} from '@/store/puzzleInteractionSlice';
import { getLevelData, getSentenceData } from '@/store/selectors';
import { PuzzleType } from '@/store/types';

import styles from '@/components/Game/components/WordBank/WordBank.module.sass';

type WordBankProps = {
  imageSrc: string;
};

export const WordBank = ({ imageSrc }: WordBankProps) => {
  const dispatch = useAppDispatch();
  const sentenceText = useAppSelector(getSentenceData)?.textExample || '';
  const { author, name, year } = useAppSelector(getLevelData) || {};
  const { wordBank: puzzles, isShowLevelInfo } = useAppSelector(
    (state) => state.puzzleInteraction,
  );

  useEffect(() => {
    dispatch(setPuzzles(sentenceText));
  }, [dispatch, sentenceText]);

  useEffect(() => {
    if (!puzzles.length) {
      dispatch(activateCheckButton());
    } else {
      dispatch(deactivateCheckButton());
    }
  }, [puzzles.length, dispatch]);

  const onMovePuzzleToGameField = (puzzle: PuzzleType) => {
    dispatch(movePuzzleToGameField(puzzle));
  };

  return (
    <div className={styles.wordBank}>
      <div className={styles.wordBank__wrapper}>
        {isShowLevelInfo ? (
          <div
            className={styles.wordBank__info}
          >{`${author} - ${name} (${year})`}</div>
        ) : (
          Boolean(puzzles) &&
          puzzles.map((puzzle) => (
            <WordItem
              key={puzzle.id}
              wordData={puzzle}
              imageSrc={imageSrc}
              onMovePuzzle={() => onMovePuzzleToGameField(puzzle)}
            />
          ))
        )}
      </div>
    </div>
  );
};

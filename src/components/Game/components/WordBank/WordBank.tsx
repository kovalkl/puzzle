import { useEffect, useRef, useState } from 'react';

import { LevelInfo } from '@/components/Game/components/LevelInfo/LevelInfo';
import { WordList } from '@/components/Game/components/WordList/WordList';
import { setCheckButtonDisabled } from '@/store/actionButtonSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setNewPuzzles } from '@/store/puzzleInteractionSlice';
import { getLevelData, getSentenceData } from '@/store/selectors';
import { PuzzleType } from '@/store/types';

import styles from '@/components/Game/components/WordBank/WordBank.module.sass';

type WordBankProps = {
  imageSrc: string;
  puzzles: PuzzleType[];
  puzzlesIds: number[];
};

export const WordBank = ({ imageSrc, puzzles, puzzlesIds }: WordBankProps) => {
  const dispatch = useAppDispatch();
  const sentenceText = useAppSelector(getSentenceData)?.textExample || '';
  const { author, name, year } = useAppSelector(getLevelData) || {};
  const { isShowLevelInfo } = useAppSelector(
    (state) => state.puzzleInteraction,
  );
  const wordBankRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  const puzzlesOnWordBank = puzzles.filter(
    (puzzle) => puzzle.wordList === 'wordBank',
  );

  useEffect(() => {
    if (wordBankRef.current) {
      setWidth(wordBankRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    dispatch(setNewPuzzles({ sentence: sentenceText, containerWidth: width }));
  }, [dispatch, sentenceText, width]);

  useEffect(() => {
    if (!puzzlesOnWordBank.length) {
      dispatch(setCheckButtonDisabled(false));
    } else {
      dispatch(setCheckButtonDisabled(true));
    }
  }, [puzzlesOnWordBank.length, dispatch]);

  return (
    <div className={styles.wordBank} ref={wordBankRef}>
      {isShowLevelInfo ? (
        <LevelInfo author={author!} name={name!} year={year!} />
      ) : (
        <WordList
          puzzlesIds={puzzlesIds}
          type='wordBank'
          puzzles={puzzlesOnWordBank}
          imageSrc={imageSrc}
        />
      )}
    </div>
  );
};

import { getOverlayHeight } from '@/components/Game/components/GameField/getOverlayHeight';
import { WordList } from '@/components/Game/components/WordList/WordList';
import { useAppSelector } from '@/store/hooks';
import { PuzzleType } from '@/store/types';

import styles from '@/components/Game/components/GameField/GameField.module.sass';

const COUNT_SENTENCES = 10;

type GameFieldProps = {
  imageSrc: string;
  puzzles: PuzzleType[];
  puzzlesIds: number[];
};

export const GameField = ({
  imageSrc,
  puzzles,
  puzzlesIds,
}: GameFieldProps) => {
  const currentSentenceCount = useAppSelector(
    (state) => state.gameStatus.progress.currentSentenceCount,
  );

  const { isShowLevelInfo } = useAppSelector(
    (state) => state.puzzleInteraction,
  );

  const puzzlesOnGameFiled = puzzles.filter(
    (puzzle) => puzzle.wordList === 'gameField',
  );

  const getEmptyArray = () => {
    return [...Array(COUNT_SENTENCES)].map((_, index) => index + 1);
  };

  return (
    <div
      className={styles.gameField}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      {!isShowLevelInfo &&
        getEmptyArray().map((_, index) => (
          <div key={index} className={styles.gameField__row}>
            {currentSentenceCount === index + 1 && (
              <WordList
                puzzlesIds={puzzlesIds}
                type='gameField'
                puzzles={puzzlesOnGameFiled}
                imageSrc={imageSrc}
              />
            )}
          </div>
        ))}
      <div
        className={styles.gameField__overlay}
        style={{
          height: `${isShowLevelInfo ? 0 : getOverlayHeight(currentSentenceCount)}%`,
        }}
      ></div>
    </div>
  );
};

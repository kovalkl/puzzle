import { getHeightOverlay } from '@/components/Game/components/GameField/getHeightOverlay';
import { WordItem } from '@/components/Game/components/WordItem/WordItem';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { movePuzzleToWordBank } from '@/store/puzzleInteractionSlice';
import { PuzzleType } from '@/store/types';

import styles from '@/components/Game/components/GameField/GameField.module.sass';

const COUNT_SENTENCES = 10;

type GameFieldProps = {
  imageSrc: string;
};

export const GameField = ({ imageSrc }: GameFieldProps) => {
  const currentSentenceCount = useAppSelector(
    (state) => state.gameStatus.progress.currentSentenceCount,
  );
  const { gameField, isShowCorrectness, isGameFieldDisabled, isShowLevelInfo } =
    useAppSelector((state) => state.puzzleInteraction);
  const dispatch = useAppDispatch();

  const onMovePuzzleToWordBank = (puzzle: PuzzleType) => {
    dispatch(movePuzzleToWordBank(puzzle));
  };

  return (
    <div
      className={styles.gameField}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      <div
        className={styles.gameField__overlay}
        style={{
          height: isShowLevelInfo
            ? '0%'
            : getHeightOverlay(currentSentenceCount),
        }}
      ></div>
      {!isShowLevelInfo &&
        [...Array(COUNT_SENTENCES)].map((_, index) => (
          <div
            key={index}
            className={styles.gameField__row}
            id={`row_${index + 1}`}
          >
            {currentSentenceCount === index + 1 &&
              Boolean(gameField.length) &&
              gameField.map((puzzle) => (
                <WordItem
                  disabled={isGameFieldDisabled}
                  isCorrect={isShowCorrectness ? puzzle.isCorrect : null}
                  key={puzzle.id}
                  wordData={puzzle}
                  imageSrc={imageSrc}
                  onMovePuzzle={() => onMovePuzzleToWordBank(puzzle)}
                />
              ))}
          </div>
        ))}
    </div>
  );
};

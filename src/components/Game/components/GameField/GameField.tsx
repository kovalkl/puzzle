import { getHeightOverlay } from '@/components/Game/components/GameField/getHeightOverlay';
import { WordItem } from '@/components/Game/components/WordItem/WordItem';
import { WordList } from '@/components/Game/components/WordList/WordList';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { movePuzzleToWordBank } from '@/store/puzzleInteractionSlice';
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
  const { isShowCorrectness, isGameFieldDisabled, isShowLevelInfo } =
    useAppSelector((state) => state.puzzleInteraction);
  const dispatch = useAppDispatch();

  const onMovePuzzleToWordBank = (puzzle: PuzzleType) => {
    dispatch(movePuzzleToWordBank(puzzle));
  };

  const puzzlesOnGameFiled = puzzles.filter(
    (puzzle) => puzzle.wordList === 'gameField',
  );

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
            <WordList items={puzzlesIds} type='gameField'>
              {currentSentenceCount === index + 1 &&
                Boolean(puzzlesOnGameFiled.length) &&
                puzzlesOnGameFiled.map((puzzle) => (
                  <WordItem
                    disabled={isGameFieldDisabled}
                    isCorrect={isShowCorrectness ? puzzle.isCorrect : null}
                    key={puzzle.id}
                    wordData={puzzle}
                    imageSrc={imageSrc}
                    onMovePuzzle={() => onMovePuzzleToWordBank(puzzle)}
                  />
                ))}
            </WordList>
          </div>
        ))}
    </div>
  );
};

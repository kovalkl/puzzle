import { getHeightOverlay } from '@/components/Game/components/GameField/getHeightOverlay';
import { WordItem } from '@/components/Game/components/WordItem/WordItem';
import { movePuzzleToWordBank } from '@/store/gameStatusSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { PuzzleType } from '@/store/types';

import styled from '@/components/Game/components/GameField/GameField.module.sass';

const COUNT_SENTENCES = 10;

type GameFieldProps = {
  imageSrc: string;
};

export const GameField = ({ imageSrc }: GameFieldProps) => {
  const { currentSentenceCount, gameField } = useAppSelector(
    (state) => state.gameStatus,
  );
  const dispatch = useAppDispatch();

  const onMovePuzzleToWordBank = (puzzle: PuzzleType) => {
    dispatch(movePuzzleToWordBank(puzzle));
  };

  return (
    <div
      className={styled.gameField}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      <div
        className={styled.gameField__overlay}
        style={{ height: getHeightOverlay(currentSentenceCount) }}
      ></div>
      {[...Array(COUNT_SENTENCES)].map((_, index) => (
        <div
          key={index}
          className={styled.gameField__row}
          id={`row_${index + 1}`}
        >
          {currentSentenceCount === index + 1 &&
            Boolean(gameField.length) &&
            gameField.map((puzzle) => (
              <WordItem
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

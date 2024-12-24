import { WordItem } from '@/components/Game/components/WordItem/WordItem';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  movePuzzleToGameField,
  movePuzzleToWordBank,
} from '@/store/puzzleInteractionSlice';
import { PuzzleType } from '@/store/types';
import { SortableContext, useSortable } from '@dnd-kit/sortable';

import styles from '@/components/Game/components/WordList/WordList.module.sass';

type WordListProps = {
  puzzlesIds: number[];
  type: 'wordBank' | 'gameField';
  puzzles: PuzzleType[];
  imageSrc: string;
  puzzleIsCorrect?: boolean;
};

export const WordList = ({
  puzzlesIds,
  type,
  puzzles,
  imageSrc,
}: WordListProps) => {
  const { setNodeRef } = useSortable({
    id: type,
    data: {
      type: 'container',
      containerType: type,
    },
    disabled: true,
  });

  const { isShowCorrectness, isGameFieldDisabled } = useAppSelector(
    (state) => state.puzzleInteraction,
  );

  const dispatch = useAppDispatch();
  return (
    <div ref={setNodeRef}>
      <SortableContext items={puzzlesIds}>
        <div className={styles.wordList}>
          {Boolean(puzzles.length) &&
            puzzles.map((puzzle) => (
              <WordItem
                key={puzzle.id}
                wordData={puzzle}
                imageSrc={imageSrc}
                onMovePuzzle={() =>
                  dispatch(
                    type === 'wordBank'
                      ? movePuzzleToGameField(puzzle)
                      : movePuzzleToWordBank(puzzle),
                  )
                }
                disabled={type === 'gameField' ? isGameFieldDisabled : false}
                isCorrect={
                  type === 'gameField' && isShowCorrectness
                    ? puzzle.isCorrect
                    : null
                }
              />
            ))}
        </div>
      </SortableContext>
    </div>
  );
};

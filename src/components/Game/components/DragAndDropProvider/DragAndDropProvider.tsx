import { useState } from 'react';
import { createPortal } from 'react-dom';

import { GameField } from '@/components/Game/components/GameField/GameField';
import { WordBank } from '@/components/Game/components/WordBank/WordBank';
import { WordItem } from '@/components/Game/components/WordItem/WordItem';
import { useAppDispatch } from '@/store/hooks';
import {
  movePuzzleToGameField,
  movePuzzleToWordBank,
  setPuzzles,
} from '@/store/puzzleInteractionSlice';
import { PuzzleType } from '@/store/types';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable';

type DragAndDropProviderProps = {
  children: JSX.Element;
  imageUrl: string;
  puzzles: PuzzleType[];
  puzzlesIds: number[];
  isLoaded: boolean;
};

export const DragAndDropProvider = ({
  imageUrl,
  puzzles,
  puzzlesIds,
  isLoaded,
  children,
}: DragAndDropProviderProps) => {
  const dispatch = useAppDispatch();
  const [activePuzzle, setActivePuzzle] = useState<PuzzleType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <SortableContext items={['wordBank', 'gameField']}>
        <GameField
          imageSrc={imageUrl || ''}
          puzzles={puzzles}
          puzzlesIds={puzzlesIds}
        />
        {children}
        <WordBank
          imageSrc={imageUrl || ''}
          puzzles={puzzles}
          puzzlesIds={puzzlesIds}
          isLoaded={isLoaded}
        />
      </SortableContext>
      {createPortal(
        <DragOverlay>
          {activePuzzle && (
            <WordItem
              wordData={activePuzzle}
              disabled
              onMovePuzzle={() => {}}
              imageSrc={imageUrl || ''}
            />
          )}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'puzzle') {
      setActivePuzzle(event.active.data.current.wordData);
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    dispatch(
      setPuzzles(
        arrayMove(
          puzzles,
          puzzles.findIndex((puzzle) => puzzle.id === activeId),
          puzzles.findIndex((puzzle) => puzzle.id === overId),
        ),
      ),
    );
  }

  function onDragOver(event: DragOverEvent) {
    const { over, active } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (over.data.current?.type === 'puzzle') {
      dispatch(
        setPuzzles(
          arrayMove(
            puzzles,
            puzzles.findIndex((puzzle) => puzzle.id === activeId),
            puzzles.findIndex((puzzle) => puzzle.id === overId),
          ),
        ),
      );
    } else if (over.data.current?.type === 'container') {
      if (over.data.current.containerType === 'wordBank') {
        dispatch(movePuzzleToWordBank(active.data.current?.wordData));
      } else if (over.data.current.containerType === 'gameField') {
        dispatch(movePuzzleToGameField(active.data.current?.wordData));
      }
    }
  }
};

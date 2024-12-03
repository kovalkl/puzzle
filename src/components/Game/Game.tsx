import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { ActionButtons } from '@/components/Game/components/ActionButtons/ActionButtons';
import { GameField } from '@/components/Game/components/GameField/GameField';
import { HintsBlock } from '@/components/Game/components/HintsBlock/HintsBlock';
import { SentenceAudio } from '@/components/Game/components/SentenceAudio/SentenceAudio';
import { Translation } from '@/components/Game/components/Translation/Translation';
import { WordBank } from '@/components/Game/components/WordBank/WordBank';
import { WordItem } from '@/components/Game/components/WordItem/WordItem';
import { fetchImage } from '@/store/gameImageSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPuzzles } from '@/store/puzzleInteractionSlice';
import { getLevelData } from '@/store/selectors';
import { PuzzleType } from '@/store/types';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import styles from '@/components/Game/Game.module.sass';

export const Game = () => {
  const dispatch = useAppDispatch();
  const imageSrc = useAppSelector(getLevelData)?.imageSrc;
  const isShowLevelInfo = useAppSelector(
    (state) => state.puzzleInteraction.isShowLevelInfo,
  );
  const { puzzles } = useAppSelector((state) => state.puzzleInteraction);

  const puzzlesIds = useMemo(() => {
    return puzzles.map((puzzle) => puzzle.id);
  }, [puzzles]);

  const [activePuzzle, setActivePuzzle] = useState<PuzzleType | null>(null);

  useEffect(() => {
    if (imageSrc) {
      dispatch(fetchImage({ imageSrc }));
    }
  }, [dispatch, imageSrc]);

  const fetchedImage = useAppSelector((state) => state.gameImage.imageUrl);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
  );

  return (
    <div className={`${styles.game}`}>
      <div className={styles.game__wrapper}>
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <HintsBlock />
          <GameField
            imageSrc={fetchedImage || ''}
            puzzles={puzzles}
            puzzlesIds={puzzlesIds}
          />
          <div className={styles.game__sentenceHints}>
            {!isShowLevelInfo && (
              <>
                <SentenceAudio />
                <Translation />
              </>
            )}
          </div>
          <WordBank
            imageSrc={fetchedImage || ''}
            puzzles={puzzles}
            puzzlesIds={puzzlesIds}
          />
          <ActionButtons />
          {createPortal(
            <DragOverlay>
              {activePuzzle && (
                <WordItem
                  wordData={activePuzzle}
                  disabled
                  onMovePuzzle={() => {}}
                  imageSrc={fetchedImage || ''}
                ></WordItem>
              )}
            </DragOverlay>,
            document.body,
          )}
        </DndContext>
      </div>
    </div>
  );

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'puzzle') {
      setActivePuzzle(event.active.data.current.wordData);
      return;
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
};

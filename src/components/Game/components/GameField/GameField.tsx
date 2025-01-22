import { useEffect, useRef, useState } from 'react';

import { getOverlayHeight } from '@/components/Game/components/GameField/getOverlayHeight';
import { WordList } from '@/components/Game/components/WordList/WordList';
import { setImageScale } from '@/store/gameImageSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setNewPuzzles } from '@/store/puzzleInteractionSlice';
import { getSentenceData } from '@/store/selectors';
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
  const [imageSize, setImageSize] = useState({ imageWidth: 0, imageHeight: 0 });
  const sentenceText = useAppSelector(getSentenceData)?.textExample || '';
  const sentenceCounter = useAppSelector(
    (state) => state.gameStatus.progress.currentSentenceCount,
  );
  const dispatch = useAppDispatch();

  const gameFieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameFieldRef.current) {
      setImageSize({
        imageHeight: gameFieldRef.current.offsetHeight,
        imageWidth: gameFieldRef.current.offsetWidth,
      });
    }
  }, []);

  useEffect(() => {
    dispatch(
      setImageScale({
        width: imageSize.imageWidth,
        height: imageSize.imageHeight,
      }),
    );
  }, [dispatch, imageSize.imageHeight, imageSize.imageWidth]);

  useEffect(() => {
    dispatch(
      setNewPuzzles({
        sentence: sentenceText,
        containerWidth: imageSize.imageWidth!,
        containerHeight: imageSize.imageHeight!,
        sentenceCounter,
      }),
    );
  }, [
    dispatch,
    imageSize.imageHeight,
    imageSize.imageWidth,
    sentenceText,
    sentenceCounter,
  ]);

  const isShowLevelInfo = useAppSelector(
    (state) => state.puzzleInteraction.isShowLevelInfo,
  );

  const { height, width } = useAppSelector(
    (state) => state.gameImage.imageScale,
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
      ref={gameFieldRef}
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: `${width}px ${height}px`,
      }}
    >
      {!isShowLevelInfo &&
        getEmptyArray().map((_, index) => (
          <div key={index} className={styles.gameField__row}>
            {sentenceCounter === index + 1 && (
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
          height: `${isShowLevelInfo ? 0 : getOverlayHeight(sentenceCounter)}%`,
        }}
      ></div>
    </div>
  );
};

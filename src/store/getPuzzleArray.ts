import { PuzzleType, WordListType } from '@/store/types';

const BORDER_WIDTH_PX = 1;
const COUNT_SENTENCES = 10;

const getPuzzleArray = (
  sentence: string,
  containerWidth: number,
  containerHeight: number,
  sentenceCounter: number,
): PuzzleType[] => {
  if (!sentence.length) {
    return [];
  }
  const sentenceLength = sentence.replace(/\s/g, '').length;

  const shuffledArray = sentence.split(' ').map((text, index) => ({
    text,
    id: index + 1,
    wordList: 'wordBank' as WordListType,
  }));

  const wordsWithWidths = shuffledArray.map((word) => ({
    ...word,
    widthPx: Math.max(
      Math.floor((word.text.length / sentenceLength) * containerWidth),
      30,
    ),
    offset: {
      offsetX: 0,
      offsetY: 0,
    },
  }));

  const totalWidth = wordsWithWidths.reduce(
    (sum, item) => sum + item.widthPx,
    0,
  );

  if (wordsWithWidths.length > 0) {
    wordsWithWidths[wordsWithWidths.length - 1].widthPx +=
      containerWidth - totalWidth;
  }

  const wordsWithWidthsAndOffsets = wordsWithWidths.map((word, index) => {
    const offsetX =
      index === 0
        ? BORDER_WIDTH_PX
        : wordsWithWidths
            .slice(0, index)
            .reduce((sum, item) => sum + item.widthPx, 0) + BORDER_WIDTH_PX;

    const offsetY =
      sentenceCounter === 1
        ? BORDER_WIDTH_PX
        : (containerHeight / COUNT_SENTENCES) * (sentenceCounter - 1) +
          BORDER_WIDTH_PX;

    return {
      ...word,
      offset: {
        offsetX,
        offsetY,
      },
    };
  });

  return wordsWithWidthsAndOffsets;
};

export const getShuffledPuzzleArray = (
  sentenceArray: string,
  containerWidth: number,
  containerHeight: number,
  sentenceCounter: number,
): PuzzleType[] => {
  const arrayCopy = getPuzzleArray(
    sentenceArray,
    containerWidth,
    containerHeight,
    sentenceCounter,
  );

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy;
};

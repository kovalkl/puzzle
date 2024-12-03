import { PuzzleType, WordListType } from '@/store/types';

const getPuzzleArray = (
  sentence: string,
  containerWidth: number,
): PuzzleType[] => {
  const contentWidth = containerWidth - 4;
  const sentenceLength = sentence.replace(/\s/g, '').length;

  const shuffledArray = sentence.split(' ').map((text, index) => ({
    text,
    id: index + 1,
    wordList: 'wordBank' as WordListType,
  }));

  const wordsWithWidths = shuffledArray.map((word) => ({
    ...word,
    widthPx: Math.max(
      Math.floor((word.text.length / sentenceLength) * contentWidth),
      5,
    ),
  }));

  const totalWidth = wordsWithWidths.reduce(
    (sum, item) => sum + item.widthPx,
    0,
  );

  if (wordsWithWidths.length > 0) {
    wordsWithWidths[wordsWithWidths.length - 1].widthPx +=
      contentWidth - totalWidth;
  }

  return wordsWithWidths;
};

export const getShuffledPuzzleArray = (
  sentenceArray: string,
  containerWidth: number,
): PuzzleType[] => {
  const arrayCopy = getPuzzleArray(sentenceArray, containerWidth);

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy;
};

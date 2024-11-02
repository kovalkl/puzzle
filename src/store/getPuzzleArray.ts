import { PuzzleType } from '@/store/types';

export const getPuzzleArray = (sentence: string): PuzzleType[] => {
  const sentenceLength = sentence.replace(/\s/g, '').length;

  const shuffledArray = sentence.split(' ').map((text, index) => ({
    text,
    id: index + 1,
  }));

  const wordsWithWidths = shuffledArray.map((word) => ({
    ...word,
    width: Math.max(Math.floor((word.text.length / sentenceLength) * 100), 5),
  }));

  const totalWidth = wordsWithWidths.reduce((sum, item) => sum + item.width, 0);
  wordsWithWidths[wordsWithWidths.length - 1].width += 100 - totalWidth;

  return wordsWithWidths;
};

export const getShuffledPuzzleArray = (sentenceArray: string): PuzzleType[] => {
  const arrayCopy = getPuzzleArray(sentenceArray);

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy;
};

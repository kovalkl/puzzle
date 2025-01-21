export type LevelDataType = {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
};

export type WordsType = {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
};

export type RoundType = {
  roundsCount: number;
  rounds: {
    levelData: LevelDataType;
    words: WordsType[];
  }[];
};

export type WordListType = 'wordBank' | 'gameField';

export type PuzzleType = {
  id: number;
  text: string;
  widthPx: number;
  isCorrect?: boolean;
  wordList: WordListType;
  offsetX: number;
};

export type ImageParamsType = {
  width: number;
  height: number;
};

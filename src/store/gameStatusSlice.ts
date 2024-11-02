import { getPuzzleArray, getShuffledPuzzleArray } from '@/store/getPuzzleArray';
import { PuzzleType } from '@/store/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const COUNT_ROUNDS = 6;

type HintsType = {
  isAudioEnabled: boolean;
  isImageEnabled: boolean;
  isTranslationEnabled: boolean;
};

type ProgressType = {
  currentRound: number;
  currentLevel: number;
  currentSentenceCount: number;
};

type GameStatusSliceType = {
  countRounds: number;
  countLevels: number;
  progress: ProgressType;
  currentSentenceText: string[];
  gameData: {
    wordBank: PuzzleType[];
    gameField: PuzzleType[];
  };
  hints: HintsType;
  isShowCorrectness: boolean;
  isSentenceCorrect: boolean;
};

const initialState: GameStatusSliceType = {
  countRounds: COUNT_ROUNDS,
  countLevels: 0,
  progress: {
    currentRound: 1,
    currentLevel: 1,
    currentSentenceCount: 1,
  },
  currentSentenceText: [],
  gameData: {
    wordBank: [],
    gameField: [],
  },
  hints: {
    isAudioEnabled: false,
    isImageEnabled: false,
    isTranslationEnabled: false,
  },
  isShowCorrectness: false,
  isSentenceCorrect: false,
};

const gameStatusSlice = createSlice({
  name: 'gameStatus',
  initialState,
  reducers: {
    setCurrentRound: (state, action: PayloadAction<number>) => {
      state.progress.currentLevel = 1;
      state.progress.currentSentenceCount = 1;
      state.progress.currentRound = action.payload;
    },
    setCurrentLevel: (state, action: PayloadAction<number>) => {
      state.progress.currentSentenceCount = 1;
      state.progress.currentLevel = action.payload;
    },

    setPuzzles: (state, action: PayloadAction<string>) => {
      state.gameData.gameField = [];
      state.currentSentenceText = action.payload.split(' ');

      state.gameData.wordBank = getShuffledPuzzleArray(action.payload);
    },

    movePuzzleToGameField: (state, action: PayloadAction<PuzzleType>) => {
      state.isShowCorrectness = false;

      state.gameData.gameField.push(action.payload);

      state.gameData.wordBank = state.gameData.wordBank.filter(
        (puzzle) => puzzle.id !== action.payload.id,
      );
    },

    movePuzzleToWordBank: (state, action: PayloadAction<PuzzleType>) => {
      state.isShowCorrectness = false;

      state.gameData.wordBank.push(action.payload);

      state.gameData.gameField = state.gameData.gameField.filter(
        (puzzle) => puzzle.id !== action.payload.id,
      );
    },

    checkCorrectness: (state) => {
      state.isShowCorrectness = true;

      if (state.hints.isImageEnabled) {
        state.gameData.gameField = state.gameData.gameField.map(
          (puzzle, index) => {
            return {
              ...puzzle,
              isCorrect: puzzle.id === index + 1,
            };
          },
        );
      } else {
        state.gameData.gameField = state.gameData.gameField.map(
          (puzzle, index) => {
            return {
              ...puzzle,
              isCorrect:
                puzzle.text.toLowerCase() ===
                state.currentSentenceText[index].toLowerCase(),
            };
          },
        );
      }

      state.isSentenceCorrect = state.gameData.gameField.every((puzzle) => {
        return puzzle.isCorrect;
      });
    },

    setNextSentence: (state) => {
      state.isSentenceCorrect = false;

      if (state.progress.currentSentenceCount < 10) {
        state.progress.currentSentenceCount += 1;
        return;
      }

      state.progress.currentSentenceCount = 1;

      if (state.progress.currentLevel < state.countLevels) {
        state.progress.currentLevel += 1;
        return;
      }

      state.progress.currentLevel = 1;

      if (state.progress.currentRound < state.countRounds) {
        state.progress.currentRound += 1;
        return;
      }

      state.progress.currentRound = 1;
    },

    getCorrectPuzzles: (state) => {
      state.gameData.gameField = getPuzzleArray(
        state.currentSentenceText.join(' '),
      );

      state.gameData.wordBank = [];

      state.isSentenceCorrect = true;
    },

    setCountLevels: (state, action: PayloadAction<number>) => {
      state.countLevels = action.payload;
    },
  },
});

export const {
  setCurrentRound,
  setCurrentLevel,
  setNextSentence,
  setPuzzles,
  movePuzzleToGameField,
  movePuzzleToWordBank,
  checkCorrectness,
  setCountLevels,
  getCorrectPuzzles,
} = gameStatusSlice.actions;

export default gameStatusSlice.reducer;

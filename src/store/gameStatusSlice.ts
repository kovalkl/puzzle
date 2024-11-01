import { splitShuffleWithWidth } from '@/store/splitShuffleWithWidth';
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
      state.progress.currentRound = action.payload;

      state.progress.currentLevel = 1;
    },
    setCurrentLevel: (state, action: PayloadAction<number>) => {
      state.progress.currentLevel = action.payload;
    },

    setNextSentence: (stage) => {
      stage.progress.currentSentenceCount += 1;
    },

    setPuzzles: (state, action: PayloadAction<string>) => {
      state.gameData.gameField = [];
      state.currentSentenceText = action.payload.split(' ');

      state.gameData.wordBank = splitShuffleWithWidth(action.payload);
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
} = gameStatusSlice.actions;

export default gameStatusSlice.reducer;

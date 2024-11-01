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
  currentSentenceText: string;
  gameData: {
    wordBank: PuzzleType[];
    gameField: PuzzleType[];
  };
  hints: HintsType;
};

const initialState: GameStatusSliceType = {
  countRounds: COUNT_ROUNDS,
  progress: {
    currentRound: 1,
    currentLevel: 1,
    currentSentenceCount: 1,
  },
  currentSentenceText: '',
  gameData: {
    wordBank: [],
    gameField: [],
  },
  hints: {
    isAudioEnabled: true,
    isImageEnabled: true,
    isTranslationEnabled: true,
  },
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
      state.currentSentenceText = action.payload;

      state.gameData.wordBank = splitShuffleWithWidth(action.payload);
    },

    movePuzzleToGameField: (state, action: PayloadAction<PuzzleType>) => {
      state.gameData.gameField.push(action.payload);

      state.gameData.wordBank = state.gameData.wordBank.filter(
        (puzzle) => puzzle.id !== action.payload.id,
      );
    },

    movePuzzleToWordBank: (state, action: PayloadAction<PuzzleType>) => {
      state.gameData.wordBank.push(action.payload);

      state.gameData.gameField = state.gameData.gameField.filter(
        (puzzle) => puzzle.id !== action.payload.id,
      );
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
} = gameStatusSlice.actions;

export default gameStatusSlice.reducer;

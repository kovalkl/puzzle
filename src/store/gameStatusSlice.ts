import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const COUNT_ROUNDS = 6;

type ProgressType = {
  currentRound: number;
  currentLevel: number;
  currentSentenceCount: number;
};

type GameStatusSliceType = {
  levelInfo: {
    countRounds: number;
    countLevels: number;
  };
  progress: ProgressType;
  solvedSentences: {
    solved: string[];
    unsolved: string[];
  };
};

const initialState: GameStatusSliceType = {
  levelInfo: {
    countRounds: COUNT_ROUNDS,
    countLevels: 0,
  },
  progress: {
    currentRound: 1,
    currentLevel: 1,
    currentSentenceCount: 1,
  },
  solvedSentences: {
    solved: [],
    unsolved: [],
  },
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

    setNextSentence: (state) => {
      if (state.progress.currentSentenceCount < 10) {
        state.progress.currentSentenceCount += 1;
        return;
      }

      state.progress.currentSentenceCount = 1;

      if (state.progress.currentLevel < state.levelInfo.countLevels) {
        state.progress.currentLevel += 1;
        return;
      }

      state.progress.currentLevel = 1;

      if (state.progress.currentRound < state.levelInfo.countRounds) {
        state.progress.currentRound += 1;
        return;
      }

      state.progress.currentRound = 1;
    },

    setCountLevels: (state, action: PayloadAction<number>) => {
      state.levelInfo.countLevels = action.payload;
    },
  },
});

export const {
  setCurrentRound,
  setCurrentLevel,
  setNextSentence,
  setCountLevels,
} = gameStatusSlice.actions;

export default gameStatusSlice.reducer;

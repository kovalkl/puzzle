import { PuzzleType } from '@/store/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const COUNT_ROUNDS = 6;

type GameStatusSliceType = {
  countRounds: number;
  currentRound: number;
  currentLevel: number;
  currentSentenceCount: number;
  puzzles: PuzzleType[];
  gameField: PuzzleType[];
};

const initialState: GameStatusSliceType = {
  countRounds: COUNT_ROUNDS,
  currentRound: 1,
  currentLevel: 1,
  currentSentenceCount: 1,
  puzzles: [],
  gameField: [],
};

const gameStatusSlice = createSlice({
  name: 'gameStatus',
  initialState,
  reducers: {
    setCurrentRound: (state, action: PayloadAction<number>) => {
      state.currentRound = action.payload;

      state.currentLevel = 1;
    },
    setCurrentLevel: (state, action: PayloadAction<number>) => {
      state.currentLevel = action.payload;
    },

    setNextSentence: (stage) => {
      stage.currentSentenceCount += 1;
    },

    setPuzzles: (state, action: PayloadAction<PuzzleType[]>) => {
      state.puzzles = action.payload;
    },

    movePuzzleToGameField: (state, action: PayloadAction<PuzzleType>) => {
      state.gameField.push(action.payload);

      state.puzzles = state.puzzles.filter(
        (puzzle) => puzzle.id !== action.payload.id,
      );
    },

    movePuzzleToWordBank: (state, action: PayloadAction<PuzzleType>) => {
      state.puzzles.push(action.payload);

      state.gameField = state.gameField.filter(
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

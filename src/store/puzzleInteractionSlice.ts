import { getPuzzleArray, getShuffledPuzzleArray } from '@/store/getPuzzleArray';
import { PuzzleType } from '@/store/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type PuzzleInteractionType = {
  wordBank: PuzzleType[];
  gameField: PuzzleType[];
  isSentenceCorrect: boolean;
  isShowCorrectness: boolean;
  currentSentenceText: string;
  isGameFieldDisabled: boolean;
  isShowLevelInfo: boolean;
  isShowResult: boolean;
};

const initialState: PuzzleInteractionType = {
  wordBank: [],
  gameField: [],
  isSentenceCorrect: false,
  isShowCorrectness: false,
  currentSentenceText: '',
  isGameFieldDisabled: false,
  isShowLevelInfo: false,
  isShowResult: false,
};

export const puzzleInteractionSlice = createSlice({
  name: 'puzzleInteraction',
  initialState,
  reducers: {
    setPuzzles: (state, action: PayloadAction<string>) => {
      state.gameField = [];

      state.currentSentenceText = action.payload;

      state.wordBank = getShuffledPuzzleArray(action.payload);
    },

    movePuzzleToGameField: (state, action: PayloadAction<PuzzleType>) => {
      state.gameField.push(action.payload);

      state.wordBank = state.wordBank.filter(
        (puzzle) => puzzle.id !== action.payload.id,
      );
    },

    movePuzzleToWordBank: (state, action: PayloadAction<PuzzleType>) => {
      state.isShowCorrectness = false;

      state.wordBank.push(action.payload);

      state.gameField = state.gameField.filter(
        (puzzle) => puzzle.id !== action.payload.id,
      );
    },

    checkCorrectness: (state, action: PayloadAction<boolean>) => {
      state.isShowCorrectness = true;
      if (action) {
        state.gameField = state.gameField.map((puzzle, index) => {
          return {
            ...puzzle,
            isCorrect: puzzle.id === index + 1,
          };
        });
      } else {
        state.gameField = state.gameField.map((puzzle, index) => {
          return {
            ...puzzle,
            isCorrect:
              puzzle.text.toLowerCase() ===
              state.currentSentenceText.split(' ')[index].toLowerCase(),
          };
        });
      }

      state.isSentenceCorrect = state.gameField.every((puzzle) => {
        return puzzle.isCorrect;
      });
    },

    setIsSentenceCorrect: (state, action: PayloadAction<boolean>) => {
      state.isSentenceCorrect = action.payload;
    },

    setCorrectPuzzles: (state) => {
      state.gameField = getPuzzleArray(state.currentSentenceText);

      state.wordBank = [];
    },

    setGameFieldDisabled: (state, action: PayloadAction<boolean>) => {
      state.isGameFieldDisabled = action.payload;
    },

    setIsShowLevelInfo: (state, action: PayloadAction<boolean>) => {
      state.isShowLevelInfo = action.payload;
    },

    setIsShowResult: (state, action: PayloadAction<boolean>) => {
      state.isShowResult = action.payload;
    },
  },
});

export default puzzleInteractionSlice.reducer;

export const {
  setPuzzles,
  movePuzzleToGameField,
  movePuzzleToWordBank,
  checkCorrectness,
  setCorrectPuzzles,
  setGameFieldDisabled,
  setIsSentenceCorrect,
  setIsShowLevelInfo,
  setIsShowResult,
} = puzzleInteractionSlice.actions;

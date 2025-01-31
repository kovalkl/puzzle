import { getShuffledPuzzleArray } from '@/store/getPuzzleArray';
import { PuzzleType } from '@/store/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type PuzzleInteractionType = {
  puzzles: PuzzleType[];
  isSentenceCorrect: boolean;
  isShowCorrectness: boolean;
  currentSentenceText: string;
  isGameFieldDisabled: boolean;
  isShowLevelInfo: boolean;
  isShowResult: boolean;
};

const initialState: PuzzleInteractionType = {
  puzzles: [],
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
    setNewPuzzles: (
      state,
      action: PayloadAction<{
        sentence: string;
        containerWidth: number;
        containerHeight: number;
        sentenceCounter: number;
      }>,
    ) => {
      state.currentSentenceText = action.payload.sentence;

      state.puzzles = getShuffledPuzzleArray(
        action.payload.sentence,
        action.payload.containerWidth,
        action.payload.containerHeight,
        action.payload.sentenceCounter,
      );
    },

    setPuzzles: (state, action: PayloadAction<PuzzleType[]>) => {
      state.isShowCorrectness = false;
      state.puzzles = action.payload;
    },

    movePuzzleToGameField: (state, action: PayloadAction<PuzzleType>) => {
      const filteredPuzzles = state.puzzles.filter((puzzle) => {
        return puzzle.id !== action.payload.id;
      });

      const currentPuzzle = state.puzzles.find((puzzle) => {
        return puzzle.id === action.payload.id;
      })!;
      currentPuzzle.wordList = 'gameField';

      state.puzzles = [...filteredPuzzles, currentPuzzle];
    },

    movePuzzleToWordBank: (state, action: PayloadAction<PuzzleType>) => {
      const filteredPuzzles = state.puzzles.filter((puzzle) => {
        return puzzle.id !== action.payload.id;
      });

      const currentPuzzle = state.puzzles.find((puzzle) => {
        return puzzle.id === action.payload.id;
      })!;
      currentPuzzle.wordList = 'wordBank';

      state.puzzles = [...filteredPuzzles, currentPuzzle];
    },

    checkCorrectness: (state, action: PayloadAction<boolean>) => {
      state.isShowCorrectness = true;
      if (action.payload) {
        state.puzzles = state.puzzles.map((puzzle, index) => {
          return {
            ...puzzle,
            isCorrect: puzzle.id === index + 1,
          };
        });
      } else {
        state.puzzles = state.puzzles.map((puzzle, index) => {
          return {
            ...puzzle,
            isCorrect:
              puzzle.text.toLowerCase() ===
              state.currentSentenceText.split(' ')[index].toLowerCase(),
          };
        });
      }

      state.isSentenceCorrect = state.puzzles.every((puzzle) => {
        return puzzle.isCorrect;
      });
    },

    setIsSentenceCorrect: (state, action: PayloadAction<boolean>) => {
      state.isSentenceCorrect = action.payload;
    },

    setCorrectPuzzles: (state) => {
      const defaultPuzzles = state.puzzles.sort((a, b) => a.id - b.id);

      state.puzzles = defaultPuzzles.map((puzzle) => {
        return {
          ...puzzle,
          wordList: 'gameField',
        };
      });
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
  setNewPuzzles,
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

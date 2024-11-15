import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type SolvedSentenceType = {
  solved: string[];
  unsolved: string[];
};

const initialState: SolvedSentenceType = {
  solved: [],
  unsolved: [],
};

export const solvedSentenceSlice = createSlice({
  name: 'solvedSentence',
  initialState,
  reducers: {
    addSolvedSentence(state, action: PayloadAction<string>) {
      state.solved.push(action.payload);
    },

    addUnsolvedSentence(state, action: PayloadAction<string>) {
      state.unsolved.push(action.payload);
    },

    resetSolvedSentences(state) {
      state.solved = [];
      state.unsolved = [];
    },
  },
});

export const { addSolvedSentence, addUnsolvedSentence, resetSolvedSentences } =
  solvedSentenceSlice.actions;

export default solvedSentenceSlice.reducer;

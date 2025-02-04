import { RoundType, StatusType } from '@/store/types';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchRounds = createAsyncThunk(
  'rounds/fetchRounds',
  async ({ round }: { round: number }) => {
    const response = await fetch(
      `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel${round}.json`,
    );

    const data: RoundType = await response.json();

    return { round, rounds: data };
  },
);

export type RoundSliceType = {
  status: StatusType;
  error: null | string;
  rounds: {
    [key: number]: RoundType;
  };
};

const initialState: RoundSliceType = {
  rounds: {},
  status: null,
  error: null,
};

const gameDataSlice = createSlice({
  name: 'gameData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRounds.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });

    builder.addCase(
      fetchRounds.fulfilled,
      (state, action: PayloadAction<{ round: number; rounds: RoundType }>) => {
        state.status = 'fulfilled';
        if (!state.rounds[action.payload.round]) {
          state.rounds[action.payload.round] = action.payload.rounds;
        }
      },
    );
  },
});

export default gameDataSlice.reducer;

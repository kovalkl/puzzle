import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchRounds = createAsyncThunk(
  'rounds/fetchRounds',
  async ({ round }: { round: number }) => {
    const response = await fetch(
      `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel${round}.json`,
    );

    const data = await response.json();

    return data;
  },
);

type RoundType = {
  rounds: {
    levelData: {
      id: string;
      name: string;
      imageSrs: string;
      cutSrc: string;
      author: string;
      year: string;
    };
    words: {
      audioExample: string;
      textExample: string;
      textExampleTranslate: string;
      id: number;
      word: string;
      wordTranslate: string;
    }[];
  }[];
};

type RoundSliceType = {
  [key: number]: RoundType;
  status: null | 'pending' | 'fulfilled' | 'rejected';
  error: null | string;
};

const initialState: RoundSliceType = {
  status: null,
  error: null,
};

const roundSlice = createSlice({
  name: 'rounds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRounds.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });

    builder.addCase(
      fetchRounds.fulfilled,
      (state, action: PayloadAction<RoundType>) => {
        state.status = 'fulfilled';
        state.rounds = action.payload;
      },
    );
  },
});

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const COUNT_ROUNDS = 6;

export const fetchRounds = createAsyncThunk(
  'rounds/fetchRounds',
  async ({ round }: { round: string }) => {
    const response = await fetch(
      `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel${round}.json`,
    );

    const data: RoundType = await response.json();

    return { round, rounds: data };
  },
);

type RoundType = {
  roundsCount: number;
  rounds: {
    [key: string]: {
      levelData: {
        id: string;
        name: string;
        imageSrs: string;
        cutSrc: string;
        author: string;
        year: string;
      };
      words: {
        [key: string]: {
          audioExample: string;
          textExample: string;
          textExampleTranslate: string;
          id: number;
          word: string;
          wordTranslate: string;
        };
      }[];
    };
  }[];
};

type RoundSliceType = {
  status: null | 'pending' | 'fulfilled' | 'rejected';
  error: null | string;
  rounds: {
    [key: string]: RoundType;
  };
  countRounds: number;
  currentRound: string;
  currentLevel: string;
};

const initialState: RoundSliceType = {
  rounds: {},
  status: null,
  error: null,
  countRounds: COUNT_ROUNDS,
  currentRound: '1',
  currentLevel: '1',
};

const roundSlice = createSlice({
  name: 'rounds',
  initialState,
  reducers: {
    setCurrentRound: (state, action: PayloadAction<string>) => {
      state.currentRound = action.payload;

      state.currentLevel = '1';
    },
    setCurrentLevel: (state, action: PayloadAction<string>) => {
      state.currentLevel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRounds.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });

    builder.addCase(
      fetchRounds.fulfilled,
      (state, action: PayloadAction<{ round: string; rounds: RoundType }>) => {
        state.status = 'fulfilled';
        if (!state.rounds[action.payload.round]) {
          state.rounds[action.payload.round] = action.payload.rounds;
        }
      },
    );
  },
});

export const { setCurrentRound, setCurrentLevel } = roundSlice.actions;

export default roundSlice.reducer;

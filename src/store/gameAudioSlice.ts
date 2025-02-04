import { StatusType } from '@/store/types';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type gameAudioSliceType = {
  status: StatusType;
  error: null | string;
  audioUrl: string | null;
};

const initialState: gameAudioSliceType = {
  status: null,
  error: null,
  audioUrl: null,
};

export const fetchAudio = createAsyncThunk(
  'gameAudio/fetchAudio',
  async ({ audioSrc }: { audioSrc: string }) => {
    const response = await fetch(
      `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${audioSrc}`,
    );

    return response.url;
  },
);

const gameAudioSlice = createSlice({
  name: 'gameAudio',
  initialState,
  reducers: {
    resetAudioUrl: (state) => {
      state.audioUrl = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      fetchAudio.fulfilled,
      (stage, action: PayloadAction<string>) => {
        stage.audioUrl = action.payload;
      },
    );
  },
});

export const { resetAudioUrl } = gameAudioSlice.actions;

export default gameAudioSlice.reducer;

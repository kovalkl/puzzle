import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type gameImageSliceType = {
  status: null | 'pending' | 'fulfilled' | 'rejected';
  error: null | string;
  imageUrl: string | null;
};

const initialState: gameImageSliceType = {
  status: null,
  error: null,
  imageUrl: null,
};

export const fetchImage = createAsyncThunk(
  'gameImage/fetchImage',
  async ({ imageSrc }: { imageSrc: string }) => {
    const response = await fetch(
      `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${imageSrc}`,
    );

    const blob = await response.blob();

    return URL.createObjectURL(blob);
  },
);

const gameImageSlice = createSlice({
  name: 'gameImage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchImage.fulfilled,
      (stage, action: PayloadAction<string>) => {
        stage.imageUrl = action.payload;
      },
    );
  },
});

export default gameImageSlice.reducer;

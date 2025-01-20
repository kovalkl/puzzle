import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type gameImageSliceType = {
  status: null | 'pending' | 'fulfilled' | 'rejected';
  error: null | string;
  imageUrl: string | null;
  imageHeight: number | null;
  imageWidth: number | null;
};

const initialState: gameImageSliceType = {
  status: null,
  error: null,
  imageUrl: null,
  imageHeight: null,
  imageWidth: null,
};

export const fetchImage = createAsyncThunk(
  'gameImage/fetchImage',
  async ({ imageSrc }: { imageSrc: string }) => {
    const response = await fetch(
      `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${imageSrc}`,
    );

    const blob = await response.blob();

    const imageUrl = URL.createObjectURL(blob);

    const img = new Image();

    img.src = imageUrl;

    return new Promise<{ imageUrl: string; width: number; height: number }>(
      (resolve) => {
        img.onload = () => {
          resolve({
            imageUrl,
            width: img.width,
            height: img.height,
          });
        };
      },
    );
  },
);

const gameImageSlice = createSlice({
  name: 'gameImage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchImage.fulfilled,
      (
        stage,
        action: PayloadAction<{
          imageUrl: string;
          width: number;
          height: number;
        }>,
      ) => {
        stage.imageUrl = action.payload.imageUrl;
        stage.imageHeight = action.payload.height;
        stage.imageWidth = action.payload.width;
      },
    );
  },
});

export default gameImageSlice.reducer;

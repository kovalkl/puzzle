import { ImageParamsType } from '@/store/types';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type gameImageSliceType = {
  status: null | 'pending' | 'fulfilled' | 'rejected';
  error: null | string;
  imageUrl: string | null;
  imageParams: {
    height: number | null;
    width: number | null;
  };
  imageScale: {
    width: number | null;
    height: number | null;
  };
};

const initialState: gameImageSliceType = {
  status: null,
  error: null,
  imageUrl: null,
  imageParams: {
    height: null,
    width: null,
  },
  imageScale: {
    width: null,
    height: null,
  },
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
  reducers: {
    setImageScale(state, action: PayloadAction<ImageParamsType>) {
      const scale = Math.max(
        action.payload.width / state.imageParams.width!,
        action.payload.height / state.imageParams.height!,
      );

      state.imageScale = {
        width: state.imageParams.width! * scale,
        height: state.imageParams.height! * scale,
      };
    },
  },
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
        stage.imageParams.height = action.payload.height;
        stage.imageParams.width = action.payload.width;
      },
    );
  },
});

export const { setImageScale } = gameImageSlice.actions;

export default gameImageSlice.reducer;

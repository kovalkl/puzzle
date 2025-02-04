import { ImageParamsType, StatusType } from '@/store/types';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type gameImageSliceType = {
  status: StatusType;
  error: null | string;
  imageUrl: string | null;
  imageParams: {
    height: number;
    width: number;
  };
  imageScale: {
    width: number;
    height: number;
  };
};

const initialState: gameImageSliceType = {
  status: null,
  error: null,
  imageUrl: null,
  imageParams: {
    height: 0,
    width: 0,
  },
  imageScale: {
    width: 0,
    height: 0,
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
      state.imageScale = action.payload;
      if (state.imageParams.width && state.imageParams.height) {
        const scale = Math.max(
          action.payload.width / state.imageParams.width!,
          action.payload.height / state.imageParams.height!,
        );

        state.imageScale = {
          width: Math.trunc(state.imageParams.width! * scale),
          height: Math.trunc(state.imageParams.height! * scale),
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
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
          stage.status = 'fulfilled';
          stage.error = null;
        },
      )
      .addCase(fetchImage.pending, (stage) => {
        stage.status = 'pending';
        stage.error = null;
        stage.imageUrl = null;
      });
  },
});

export const { setImageScale } = gameImageSlice.actions;

export default gameImageSlice.reducer;

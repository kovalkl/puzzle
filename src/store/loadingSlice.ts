import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type LoadingType = {
  loadStatus: {
    translation: boolean;
    image: boolean;
    puzzles: boolean;
  };
  isLoaded: boolean;
};

const initialState: LoadingType = {
  loadStatus: {
    translation: false,
    image: false,
    puzzles: false,
  },
  isLoaded: false,
};

const updateIsLoaded = (state: LoadingType) => {
  state.isLoaded = Object.values(state.loadStatus).every(Boolean);
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIsTranslationLoaded: (state, action: PayloadAction<boolean>) => {
      state.loadStatus.translation = action.payload;
      updateIsLoaded(state);
    },

    setIsImageLoaded: (state, action: PayloadAction<boolean>) => {
      state.loadStatus.image = action.payload;
      updateIsLoaded(state);
    },

    setIsPuzzlesLoaded: (state, action: PayloadAction<boolean>) => {
      state.loadStatus.puzzles = action.payload;
      updateIsLoaded(state);
    },
  },
});

export const { setIsTranslationLoaded, setIsImageLoaded, setIsPuzzlesLoaded } =
  loadingSlice.actions;

export default loadingSlice.reducer;

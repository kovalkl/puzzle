import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type LoadingType = {
  loadStatus: {
    translation: boolean;
    image: boolean;
  };
  isLoaded: boolean;
};

const initialState: LoadingType = {
  loadStatus: {
    translation: false,
    image: false,
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
  },
});

export const { setIsTranslationLoaded, setIsImageLoaded } =
  loadingSlice.actions;

export default loadingSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

type HintSliceType = {
  isAudioEnabled: boolean;
  isImageEnabled: boolean;
  isTranslationEnabled: boolean;
};

const initialState: HintSliceType = {
  isAudioEnabled: true,
  isImageEnabled: false,
  isTranslationEnabled: true,
};

const hintSlice = createSlice({
  name: 'hint',
  initialState,
  reducers: {
    changeTranslationHint: (state) => {
      state.isTranslationEnabled = !state.isTranslationEnabled;
    },

    changeImageHint: (state) => {
      state.isImageEnabled = !state.isImageEnabled;
    },

    changeAudioHint: (state) => {
      state.isAudioEnabled = !state.isAudioEnabled;
    },
  },
});

export const { changeTranslationHint, changeImageHint, changeAudioHint } =
  hintSlice.actions;

export default hintSlice.reducer;

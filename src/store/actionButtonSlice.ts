import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ActionButtonType = {
  checkButton: {
    text: 'Check' | 'Continue';
    disabled: boolean;
  };
  skipButton: {
    text: "I don't know" | 'Result';
    disabled: boolean;
  };
};

const initialState: ActionButtonType = {
  checkButton: {
    text: 'Check',
    disabled: true,
  },
  skipButton: {
    text: "I don't know",
    disabled: false,
  },
};

export const actionButtonSlice = createSlice({
  name: 'actionButton',
  initialState,
  reducers: {
    setCheckButtonDisabled: (state, action: PayloadAction<boolean>) => {
      state.checkButton.disabled = action.payload;
    },

    setCheckButtonToCheck: (state) => {
      state.checkButton.text = 'Check';
    },

    setCheckButtonToContinue: (state) => {
      state.checkButton.text = 'Continue';
    },

    setSkipButtonDisabled: (state, action: PayloadAction<boolean>) => {
      state.skipButton.disabled = action.payload;
    },

    setSkipButtonToSkip: (state) => {
      state.skipButton.text = "I don't know";
    },

    setSkipButtonToResult: (state) => {
      state.skipButton.text = 'Result';
    },

    setDefaultButtons: (state) => {
      state.checkButton.text = 'Check';
      state.skipButton.text = "I don't know";
      state.checkButton.disabled = true;
      state.skipButton.disabled = false;
    },
  },
});

export const {
  setCheckButtonDisabled,
  setSkipButtonDisabled,
  setCheckButtonToCheck,
  setCheckButtonToContinue,
  setSkipButtonToSkip,
  setSkipButtonToResult,
  setDefaultButtons,
} = actionButtonSlice.actions;

export default actionButtonSlice.reducer;

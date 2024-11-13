import { createSlice } from '@reduxjs/toolkit';

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
    activateCheckButton: (state) => {
      state.checkButton.disabled = false;
    },

    deactivateCheckButton: (state) => {
      state.checkButton.disabled = true;
    },

    setCheckButtonToCheck: (state) => {
      state.checkButton.text = 'Check';
    },

    setCheckButtonToContinue: (state) => {
      state.checkButton.text = 'Continue';
    },

    activateSkipButton: (state) => {
      state.skipButton.disabled = false;
    },

    deactivateSkipButton: (state) => {
      state.skipButton.disabled = true;
    },

    setSkipButtonToSkip: (state) => {
      state.skipButton.text = "I don't know";
    },

    setSkipButtonToResult: (state) => {
      state.skipButton.text = 'Result';
    },
  },
});

export const {
  activateCheckButton,
  deactivateCheckButton,
  setCheckButtonToCheck,
  setCheckButtonToContinue,
  activateSkipButton,
  deactivateSkipButton,
  setSkipButtonToSkip,
  setSkipButtonToResult,
} = actionButtonSlice.actions;

export default actionButtonSlice.reducer;

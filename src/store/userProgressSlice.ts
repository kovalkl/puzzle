import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type UserProgressType = {
  userName: string;
  userProgress: {
    [key: number]: number[];
  };
};

const initialState: UserProgressType = {
  userName: '',
  userProgress: {},
};

const userProgress = createSlice({
  name: 'userProgress',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },

    addLevel: (
      state,
      action: PayloadAction<{ round: number; level: number }>,
    ) => {
      state.userProgress[action.payload.round].push(action.payload.level);
    },
  },
});

export const { addUser, addLevel } = userProgress.actions;
export default userProgress.reducer;

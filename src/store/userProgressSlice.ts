import { createSlice } from '@reduxjs/toolkit';

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
    addUser: (state, action) => {
      state.userName = action.payload.userName;
    },

    addLevel: (state, action) => {
      state.userProgress[action.payload.round].push(action.payload.level);
    },
  },
});

export const { addUser, addLevel } = userProgress.actions;
export default userProgress.reducer;

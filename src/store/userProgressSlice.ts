import { ProgressType } from '@/store/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type UserProgressType = {
  levelsCount: {
    [key: number]: number;
  };
  users: {
    [key: string]: ProgressType;
  };
  currentUser: string | null;
};

const initialState: UserProgressType = {
  levelsCount: {},
  users: {},
  currentUser: null,
};

const userProgress = createSlice({
  name: 'userProgress',
  initialState,
  reducers: {
    addUser: (
      state,
      action: PayloadAction<{ firstName: string; surname: string }>,
    ) => {
      const userFullName = `${action.payload.firstName} ${action.payload.surname}`;

      if (!state.users[userFullName]) {
        state.users[userFullName] = {
          completedRounds: [],
        };
      }

      state.currentUser = userFullName;
    },

    addLevel: (
      state,
      action: PayloadAction<{ round: number; level: number }>,
    ) => {
      if (!state.currentUser) {
        console.error(
          'Error: User state is undefined for currentUser',
          state.currentUser,
        );
        return;
      }

      if (!state.users[state.currentUser][action.payload.round]) {
        state.users[state.currentUser][action.payload.round] = [];
      }

      state.users[state.currentUser][action.payload.round].push(
        action.payload.level,
      );

      if (
        state.users[state.currentUser][action.payload.round].length ===
        state.levelsCount[action.payload.round]
      ) {
        state.users[state.currentUser].completedRounds.push(
          action.payload.round,
        );
      }
    },

    setLevelsCount: (
      state,
      action: PayloadAction<{ round: number; roundsCount: number }>,
    ) => {
      if (!state.levelsCount) {
        state.levelsCount = {};
      }
      state.levelsCount[action.payload.round] = action.payload.roundsCount;
    },

    logoutUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { addUser, addLevel, setLevelsCount, logoutUser } =
  userProgress.actions;
export default userProgress.reducer;

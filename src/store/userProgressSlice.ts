import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type UserProgressType = {
  userName: string;
  userProgress: {
    [key: number]: {
      levelsCount: number;
      completedLevels: number[];
    };
    completedRounds: number[];
  };
};

const initialState: UserProgressType = {
  userName: '',
  userProgress: {
    completedRounds: [],
  },
};

const userProgress = createSlice({
  name: 'userProgress',
  initialState,
  reducers: {
    addUser: (
      state,
      action: PayloadAction<{ firstName: string; surname: string }>,
    ) => {
      state.userName = `${action.payload.firstName} ${action.payload.surname}`;
    },

    addLevel: (
      state,
      action: PayloadAction<{ round: number; level: number }>,
    ) => {
      if (!state.userProgress[action.payload.round]) {
        state.userProgress[action.payload.round] = {
          levelsCount: 0,
          completedLevels: [],
        };
      }

      if (
        !state.userProgress[action.payload.round].completedLevels.includes(
          action.payload.level,
        )
      ) {
        state.userProgress[action.payload.round].completedLevels.push(
          action.payload.level,
        );
      }

      if (
        state.userProgress[action.payload.round].levelsCount ===
        state.userProgress[action.payload.round].completedLevels.length
      ) {
        state.userProgress.completedRounds.push(action.payload.round);
      }
    },

    setLevelsCount: (
      state,
      action: PayloadAction<{ round: number; roundsCount: number }>,
    ) => {
      if (!state.userProgress[action.payload.round]) {
        state.userProgress[action.payload.round] = {
          levelsCount: 0,
          completedLevels: [],
        };
      }
      state.userProgress[action.payload.round].levelsCount =
        action.payload.roundsCount;
    },
  },
});

export const { addUser, addLevel, setLevelsCount } = userProgress.actions;
export default userProgress.reducer;

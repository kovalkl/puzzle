import gameDataReducer from '@/store/gameDataSlice';
import gameImageReducer from '@/store/gameImageSlice';
import gameStatusReducer from '@/store/gameStatusSlice';
import userProgressReducer from '@/store/userProgressSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    userProgress: userProgressReducer,
    gameData: gameDataReducer,
    gameStatus: gameStatusReducer,
    gameImage: gameImageReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

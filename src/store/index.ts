import roundReducer from '@/store/roundSlice';
import userProgressReducer from '@/store/userProgressSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    userProgress: userProgressReducer,
    round: roundReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

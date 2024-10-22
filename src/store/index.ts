import userProgressReducer from '@/store/userProgressSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    userProgress: userProgressReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

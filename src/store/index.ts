import userProgressReducer from '@/store/userProgressSlice';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    userProgress: userProgressReducer,
  },
});

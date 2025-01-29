import actionButtonReducer from '@/store/actionButtonSlice';
import gameAudioReducer from '@/store/gameAudioSlice';
import gameDataReducer from '@/store/gameDataSlice';
import gameImageReducer from '@/store/gameImageSlice';
import gameStatusReducer from '@/store/gameStatusSlice';
import hintReducer from '@/store/hintSlice';
import puzzleInteractionReducer from '@/store/puzzleInteractionSlice';
import solvedSentenceReducer from '@/store/solvedSentenceSlice';
import userProgressReducer from '@/store/userProgressSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  userProgress: userProgressReducer,
  gameData: gameDataReducer,
  gameStatus: gameStatusReducer,
  gameImage: gameImageReducer,
  gameAudio: gameAudioReducer,
  hint: hintReducer,
  actionButton: actionButtonReducer,
  puzzleInteraction: puzzleInteractionReducer,
  solvedSentence: solvedSentenceReducer,
});

const persistConfig = {
  key: 'puzzle',
  storage,
  whitelist: ['userProgress'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

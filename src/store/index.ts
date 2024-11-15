import actionButtonReducer from '@/store/actionButtonSlice';
import gameAudioReducer from '@/store/gameAudioSlice';
import gameDataReducer from '@/store/gameDataSlice';
import gameImageReducer from '@/store/gameImageSlice';
import gameStatusReducer from '@/store/gameStatusSlice';
import hintReducer from '@/store/hintSlice';
import puzzleInteractionReducer from '@/store/puzzleInteractionSlice';
import solvedSentenceReducer from '@/store/solvedSentenceSlice';
import userProgressReducer from '@/store/userProgressSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    userProgress: userProgressReducer,
    gameData: gameDataReducer,
    gameStatus: gameStatusReducer,
    gameImage: gameImageReducer,
    gameAudio: gameAudioReducer,
    hint: hintReducer,
    actionButton: actionButtonReducer,
    puzzleInteraction: puzzleInteractionReducer,
    solvedSentence: solvedSentenceReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

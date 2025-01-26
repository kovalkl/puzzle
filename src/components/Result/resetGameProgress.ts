import { AppDispatch } from '@/store';
import { setDefaultButtons } from '@/store/actionButtonSlice';
import { setNextSentence } from '@/store/gameStatusSlice';
import {
  setGameFieldDisabled,
  setIsSentenceCorrect,
  setIsShowLevelInfo,
} from '@/store/puzzleInteractionSlice';
import { resetSolvedSentences } from '@/store/solvedSentenceSlice';

export const resetGameProgress = () => (dispatch: AppDispatch) => {
  dispatch(resetSolvedSentences());
  dispatch(setNextSentence());
  dispatch(setDefaultButtons());
  dispatch(setIsShowLevelInfo(false));
  dispatch(setIsSentenceCorrect(false));
  dispatch(setGameFieldDisabled(false));
};

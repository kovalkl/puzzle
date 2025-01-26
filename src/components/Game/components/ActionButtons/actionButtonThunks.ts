import { AppDispatch } from '@/store';
import {
  setCheckButtonToCheck,
  setCheckButtonToContinue,
  setSkipButtonDisabled,
  setSkipButtonToResult,
  setSkipButtonToSkip,
} from '@/store/actionButtonSlice';
import { setNextSentence } from '@/store/gameStatusSlice';
import {
  checkCorrectness,
  setCorrectPuzzles,
  setGameFieldDisabled,
  setIsSentenceCorrect,
  setIsShowLevelInfo,
  setIsShowResult,
} from '@/store/puzzleInteractionSlice';
import {
  addSolvedSentence,
  addUnsolvedSentence,
  resetSolvedSentences,
} from '@/store/solvedSentenceSlice';

type handleClickCheckButtonProps = {
  buttonType: 'Check' | 'Continue';
  isImageEnabled: boolean;
  currentSentenceCount: number;
};

type handleClickSkipButtonProps = {
  buttonType: "I don't know" | 'Result';
  currentSentenceText: string;
  currentSentenceCount: number;
};

type handleCorrectSentenceProps = {
  currentSentenceText: string;
  currentSentenceCount: number;
};

export const handleClickCheckButton =
  ({
    buttonType,
    isImageEnabled,
    currentSentenceCount,
  }: handleClickCheckButtonProps) =>
  (dispatch: AppDispatch) => {
    if (buttonType === 'Check') {
      dispatch(checkCorrectness(isImageEnabled));
    }

    if (buttonType === 'Continue') {
      dispatch(setIsSentenceCorrect(false));
      dispatch(setNextSentence());
      dispatch(setSkipButtonDisabled(false));
      dispatch(setCheckButtonToCheck());
      dispatch(setGameFieldDisabled(false));
      if (currentSentenceCount === 10) {
        dispatch(setIsShowLevelInfo(false));
        dispatch(setSkipButtonToSkip());
        dispatch(resetSolvedSentences());
      }
    }
  };

export const handleClickSkipButton =
  ({
    buttonType,
    currentSentenceText,
    currentSentenceCount,
  }: handleClickSkipButtonProps) =>
  (dispatch: AppDispatch) => {
    if (buttonType === "I don't know") {
      dispatch(setCorrectPuzzles());
      dispatch(setSkipButtonDisabled(true));
      dispatch(setCheckButtonToContinue());
      dispatch(setGameFieldDisabled(true));
      dispatch(addUnsolvedSentence(currentSentenceText));
      if (currentSentenceCount === 10) {
        dispatch(setIsShowLevelInfo(true));
        dispatch(setSkipButtonToResult());
        dispatch(setSkipButtonDisabled(false));
      }
    }

    if (buttonType === 'Result') {
      dispatch(setIsShowResult(true));
    }
  };

export const handleCorrectSentence =
  ({ currentSentenceCount, currentSentenceText }: handleCorrectSentenceProps) =>
  (dispatch: AppDispatch) => {
    dispatch(setCheckButtonToContinue());
    dispatch(setSkipButtonDisabled(true));
    dispatch(setGameFieldDisabled(true));
    dispatch(addSolvedSentence(currentSentenceText));
    if (currentSentenceCount === 10) {
      dispatch(setIsShowLevelInfo(true));
      dispatch(setSkipButtonToResult());
      dispatch(setSkipButtonDisabled(false));
    }
  };

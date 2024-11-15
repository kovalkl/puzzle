import { useEffect } from 'react';

import Button from '@/components/UI/Button/Button';
import {
  setCheckButtonToCheck,
  setCheckButtonToContinue,
  setSkipButtonDisabled,
  setSkipButtonToResult,
  setSkipButtonToSkip,
} from '@/store/actionButtonSlice';
import { setNextSentence } from '@/store/gameStatusSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
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

import styles from '@/components/Game/components/ActionButtons/ActionButtons.module.sass';

export const ActionButtons = () => {
  const isSentenceCorrect = useAppSelector(
    (state) => state.puzzleInteraction.isSentenceCorrect,
  );
  const { checkButton, skipButton } = useAppSelector(
    (state) => state.actionButton,
  );
  const currentSentenceCount = useAppSelector(
    (state) => state.gameStatus.progress.currentSentenceCount,
  );
  const isImageEnabled = useAppSelector((state) => state.hint.isImageEnabled);
  const currentSentenceText = useAppSelector(
    (state) => state.puzzleInteraction.currentSentenceText,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSentenceCorrect) {
      dispatch(setCheckButtonToContinue());
      dispatch(setSkipButtonDisabled(true));
      dispatch(setGameFieldDisabled(true));
      dispatch(addSolvedSentence(currentSentenceText));
      if (currentSentenceCount === 10) {
        dispatch(setIsShowLevelInfo(true));
        dispatch(setSkipButtonToResult());
        dispatch(setSkipButtonDisabled(false));
      }
    }
  }, [isSentenceCorrect, dispatch, currentSentenceCount, currentSentenceText]);

  const onClickCheckButton = () => {
    if (checkButton.text === 'Check') {
      dispatch(checkCorrectness(isImageEnabled));
    }

    if (checkButton.text === 'Continue') {
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

  const onClickSkipButton = () => {
    if (skipButton.text === "I don't know") {
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

    if (skipButton.text === 'Result') {
      dispatch(setIsShowResult(true));
    }
  };

  return (
    <div className={styles.actionButtons}>
      <Button disabled={checkButton.disabled} onClick={onClickCheckButton}>
        {checkButton.text}
      </Button>
      <Button disabled={skipButton.disabled} onClick={onClickSkipButton}>
        {skipButton.text}
      </Button>
    </div>
  );
};

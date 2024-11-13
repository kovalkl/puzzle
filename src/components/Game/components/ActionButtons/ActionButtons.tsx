import { useEffect } from 'react';

import Button from '@/components/UI/Button/Button';
import {
  activateSkipButton,
  deactivateSkipButton,
  setCheckButtonToCheck,
  setCheckButtonToContinue,
} from '@/store/actionButtonSlice';
import { setNextSentence } from '@/store/gameStatusSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  checkCorrectness,
  resetIsSentenceCorrect,
  setCorrectPuzzles,
  setGameFieldDisabled,
  setIsShowLevelInfo,
} from '@/store/puzzleInteractionSlice';

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
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSentenceCorrect) {
      dispatch(setCheckButtonToContinue());
      dispatch(deactivateSkipButton());
      dispatch(setGameFieldDisabled(true));
      if (currentSentenceCount === 10) {
        dispatch(setIsShowLevelInfo(true));
      }
    }
  }, [isSentenceCorrect, dispatch, currentSentenceCount]);

  const onClickCheckButton = () => {
    if (checkButton.text === 'Check') {
      dispatch(checkCorrectness(isImageEnabled));
    }

    if (checkButton.text === 'Continue') {
      dispatch(resetIsSentenceCorrect());
      dispatch(setNextSentence());
      dispatch(activateSkipButton());
      dispatch(setCheckButtonToCheck());
      dispatch(setGameFieldDisabled(false));
    }
  };

  const onClickSkipButton = () => {
    if (skipButton.text === "I don't know") {
      dispatch(setCorrectPuzzles());
      dispatch(deactivateSkipButton());
      dispatch(setCheckButtonToContinue());
      dispatch(setGameFieldDisabled(true));
      if (currentSentenceCount === 10) {
        dispatch(setIsShowLevelInfo(true));
      }
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

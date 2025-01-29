import { useEffect } from 'react';

import {
  handleClickCheckButton,
  handleClickSkipButton,
  handleCorrectSentence,
} from '@/components/Game/components/ActionButtons/actionButtonThunks';
import Button from '@/components/UI/Button/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

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

  const { currentRound, currentLevel } = useAppSelector(
    (state) => state.gameStatus.progress,
  );

  useEffect(() => {
    if (isSentenceCorrect) {
      dispatch(
        handleCorrectSentence({
          currentSentenceText,
          currentSentenceCount,
          currentRound,
          currentLevel,
        }),
      );
    }
  }, [
    isSentenceCorrect,
    dispatch,
    currentSentenceCount,
    currentSentenceText,
    currentRound,
    currentLevel,
  ]);

  const onClickCheckButton = () => {
    dispatch(
      handleClickCheckButton({
        isImageEnabled,
        currentSentenceCount,
        buttonType: checkButton.text,
      }),
    );
  };

  const onClickSkipButton = () => {
    dispatch(
      handleClickSkipButton({
        buttonType: skipButton.text,
        currentSentenceText,
        currentSentenceCount,
        currentRound,
        currentLevel,
      }),
    );
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

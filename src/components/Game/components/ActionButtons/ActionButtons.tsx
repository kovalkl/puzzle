import Button from '@/components/UI/Button/Button';
import {
  checkCorrectness,
  getCorrectPuzzles,
  setNextSentence,
} from '@/store/gameStatusSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import styles from '@/components/Game/components/ActionButtons/ActionButtons.module.sass';

export const ActionButtons = () => {
  const {
    gameData: { wordBank },
    isSentenceCorrect,
  } = useAppSelector((state) => state.gameStatus);
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(isSentenceCorrect ? setNextSentence() : checkCorrectness());
  };

  const onClickGetCorrectPuzzles = () => {
    dispatch(getCorrectPuzzles());
  };

  return (
    <div className={styles.actionButtons}>
      <Button disabled={Boolean(wordBank.length)} onClick={onClick}>
        {isSentenceCorrect ? 'Continue' : 'Check'}
      </Button>
      <Button onClick={onClickGetCorrectPuzzles}>I don't know</Button>
    </div>
  );
};

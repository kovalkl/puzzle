import Button from '@/components/UI/Button/Button';
import { checkCorrectness } from '@/store/gameStatusSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import styles from '@/components/Game/components/ActionButtons/ActionButtons.module.sass';

export const ActionButtons = () => {
  const { wordBank } = useAppSelector((state) => state.gameStatus.gameData);
  const dispatch = useAppDispatch();

  const onCheckCorrectness = () => {
    dispatch(checkCorrectness());
  };

  return (
    <div className={styles.actionButtons}>
      <Button disabled={Boolean(wordBank.length)} onClick={onCheckCorrectness}>
        Check
      </Button>
      <Button>I don't know</Button>
    </div>
  );
};

import Button from '@/components/UI/Button/Button';
import { useAppSelector } from '@/store/hooks';

import styles from '@/components/Game/components/ActionButtons/ActionButtons.module.sass';

export const ActionButtons = () => {
  const { puzzles } = useAppSelector((state) => state.gameStatus);

  return (
    <div className={styles.actionButtons}>
      <Button disabled={Boolean(puzzles.length)}>Check</Button>
      <Button>I don't know</Button>
    </div>
  );
};

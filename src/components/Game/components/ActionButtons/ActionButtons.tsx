import Button from '@/components/UI/Button/Button';
import { useAppSelector } from '@/store/hooks';

import styles from '@/components/Game/components/ActionButtons/ActionButtons.module.sass';

export const ActionButtons = () => {
  const { wordBank } = useAppSelector((state) => state.gameStatus.gameData);

  return (
    <div className={styles.actionButtons}>
      <Button disabled={Boolean(wordBank.length)}>Check</Button>
      <Button>I don't know</Button>
    </div>
  );
};

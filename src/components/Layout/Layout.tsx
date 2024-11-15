import { Game } from '@/components/Game/Game';
import { Header } from '@/components/Header/Header';
import { Result } from '@/components/Result/Result';
import { useAppSelector } from '@/store/hooks';

import styles from '@/components/Layout/Layout.module.sass';

export const Layout = () => {
  const isShowResult = useAppSelector(
    (state) => state.puzzleInteraction.isShowResult,
  );
  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>
        {isShowResult ? <Result /> : <Game />}
      </main>
    </div>
  );
};

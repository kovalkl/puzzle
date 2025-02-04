import { ActionButtons } from '@/components/Game/components/ActionButtons/ActionButtons';
import { DragAndDropProvider } from '@/components/Game/components/DragAndDropProvider/DragAndDropProvider';
import { HintsBlock } from '@/components/Game/components/HintsBlock/HintsBlock';
import { TranslationBlock } from '@/components/Game/components/TranslationBlock/TranslationBlock';
import { useAppSelector } from '@/store/hooks';

import styles from '@/components/Game/Game.module.sass';

export const Game = () => {
  const isShowLevelInfo = useAppSelector(
    (state) => state.puzzleInteraction.isShowLevelInfo,
  );

  return (
    <div className={styles.game}>
      <div className={styles.game__wrapper}>
        <HintsBlock />
        <DragAndDropProvider>
          <div className={styles.game__sentenceHints}>
            {!isShowLevelInfo && <TranslationBlock />}
          </div>
        </DragAndDropProvider>
        <ActionButtons />
      </div>
    </div>
  );
};

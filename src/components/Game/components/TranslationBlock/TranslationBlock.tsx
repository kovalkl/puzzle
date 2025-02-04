import { SentenceAudio } from '@/components/Game/components/SentenceAudio/SentenceAudio';
import { Translation } from '@/components/Game/components/Translation/Translation';

import styles from '@/components/Game/components/TranslationBlock/TranslationBlock.module.sass';

export const TranslationBlock = () => {
  return (
    <div className={styles.translation}>
      <SentenceAudio />
      <Translation />
    </div>
  );
};

import { PuzzleType } from '@/store/types';

import styles from '@/components/Game/components/WordItem/WordItem.module.sass';

type WordItemProps = {
  wordData: PuzzleType;
  imageSrc: string;
  onMovePuzzle: () => void;
};

export const WordItem = ({ wordData, onMovePuzzle }: WordItemProps) => {
  return (
    <div
      className={styles.wordItem}
      style={{ width: `${wordData.width}%` }}
      onClick={onMovePuzzle}
    >
      {wordData.text}
    </div>
  );
};

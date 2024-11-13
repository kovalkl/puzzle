import { PuzzleType } from '@/store/types';

import styles from '@/components/Game/components/WordItem/WordItem.module.sass';

type WordItemProps = {
  wordData: PuzzleType;
  imageSrc: string;
  onMovePuzzle: () => void;
  isCorrect?: boolean | null;
  disabled?: boolean;
};

export const WordItem = ({
  wordData,
  onMovePuzzle,
  isCorrect,
  disabled,
}: WordItemProps) => {
  return (
    <div
      className={`${styles.wordItem} ${isCorrect === true ? styles.success : ''} ${isCorrect === false ? styles.error : ''} ${disabled ? styles.disabled : ''}`}
      style={{ width: `${wordData.width}%` }}
      onClick={disabled ? undefined : onMovePuzzle}
    >
      {wordData.text}
    </div>
  );
};

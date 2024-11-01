import { PuzzleType } from '@/store/types';

import styles from '@/components/Game/components/WordItem/WordItem.module.sass';

type WordItemProps = {
  wordData: PuzzleType;
  imageSrc: string;
  onMovePuzzle: () => void;
  isCorrect?: boolean | null;
};

export const WordItem = ({
  wordData,
  onMovePuzzle,
  isCorrect,
}: WordItemProps) => {
  return (
    <div
      className={`${styles.wordItem} ${isCorrect === true ? styles.success : ''} ${isCorrect === false ? styles.error : ''}`}
      style={{ width: `${wordData.width}%` }}
      onClick={onMovePuzzle}
    >
      {wordData.text}
    </div>
  );
};

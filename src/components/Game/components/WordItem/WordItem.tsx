import { PuzzleType } from '@/store/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: wordData.id,
    data: {
      type: 'puzzle',
      wordData,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    width: `${wordData.widthPx}px`,
  };

  if (isDragging) {
    return (
      <div
        className={`${styles.wordItem} ${styles.wordItem__dragging}`}
        ref={setNodeRef}
        style={style}
      />
    );
  }

  return (
    <div
      className={`${styles.wordItem} ${isCorrect === true ? styles.success : ''} ${isCorrect === false ? styles.error : ''} ${disabled ? styles.disabled : ''}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={disabled ? undefined : onMovePuzzle}
    >
      {wordData.text}
    </div>
  );
};

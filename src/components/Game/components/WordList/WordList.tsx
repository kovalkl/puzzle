import { SortableContext } from '@dnd-kit/sortable';

import styles from '@/components/Game/components/WordList/WordList.module.sass';

type WordListProps = {
  items: number[];
  type: 'wordBank' | 'gameField';
  children: React.ReactNode;
};

export const WordList = ({ items, type, children }: WordListProps) => {
  return (
    <div className={styles.wordList} data-type={type}>
      <SortableContext items={items}>{children}</SortableContext>
    </div>
  );
};

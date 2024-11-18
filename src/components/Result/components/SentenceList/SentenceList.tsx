import styles from '@/components/Result/components/SentenceList/SentenceList.module.sass';

type SentenceListProps = {
  title: 'I know' | "I don't know";
  list: string[];
};

export const SentenceList = ({ title, list }: SentenceListProps) => {
  return (
    <div className={styles.sentenceList}>
      <div className={styles.sentenceList__header}>
        <span className={styles.sentenceList__title}>{title}</span>
        <span
          className={`${styles.sentenceList__count} ${title === 'I know' ? styles.success : styles.error}`}
        >
          {list.length}
        </span>
      </div>
      <ul>
        {list.map((item) => (
          <li className={styles.sentenceList__item} key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

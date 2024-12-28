import styles from '@/components/Game/components/LevelInfo/LevelInfo.module.sass';

type LevelInfoProps = {
  author: string;
  name: string;
  year: string;
};

export const LevelInfo = ({ author, name, year }: LevelInfoProps) => {
  return <div className={styles.info}>{`${author} - ${name} (${year})`}</div>;
};

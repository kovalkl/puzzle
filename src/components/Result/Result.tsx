import '@/components/Result/components/SentenceList/SentenceList';
import { SentenceList } from '@/components/Result/components/SentenceList/SentenceList';
import { resetGameProgress } from '@/components/Result/resetGameProgress';
import Button from '@/components/UI/Button/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLevelData } from '@/store/selectors';

import styles from '@/components/Result/Result.module.sass';

export const Result = () => {
  const imageSrc = useAppSelector((state) => state.gameImage.imageUrl) || '';
  const { author, name, year } = useAppSelector(getLevelData) || {};
  const { solved, unsolved } = useAppSelector((state) => state.solvedSentence);
  const dispatch = useAppDispatch();

  const onContinue = () => {
    dispatch(resetGameProgress());
  };

  return (
    <div className={styles.result}>
      <div className={styles.result__levelInfo}>
        <img className={styles.result__image} src={imageSrc} alt='result' />
        <span
          className={styles.result__levelName}
        >{`${author} - ${name} (${year})`}</span>
      </div>
      {solved.length > 0 && <SentenceList title='I know' list={solved} />}
      {unsolved.length > 0 && (
        <SentenceList title="I don't know" list={unsolved} />
      )}
      <Button onClick={onContinue}>Continue</Button>
    </div>
  );
};

import Button from '@/components/UI/Button/Button';
import { setDefaultButtons } from '@/store/actionButtonSlice';
import { setNextSentence } from '@/store/gameStatusSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLevelData } from '@/store/selectors';
import { resetSolvedSentences } from '@/store/solvedSentenceSlice';

import styles from '@/components/Result/Result.module.sass';

export const Result = () => {
  const imageSrc = useAppSelector((state) => state.gameImage.imageUrl) || '';
  const { author, name, year } = useAppSelector(getLevelData) || {};
  const { solved, unsolved } = useAppSelector((state) => state.solvedSentence);
  const dispatch = useAppDispatch();

  const onContinue = () => {
    dispatch(resetSolvedSentences());
    dispatch(setNextSentence());
    dispatch(setDefaultButtons());
  };

  return (
    <div className={styles.result}>
      <img className={styles.result__image} src={imageSrc} alt='result' />
      <span>{`${author} - ${name} (${year})`}</span>
      {solved.length > 0 && (
        <>
          <span>I know</span>
          <ul>
            {solved.map((sentence) => (
              <li key={sentence}>{sentence}</li>
            ))}
          </ul>
        </>
      )}
      {unsolved.length > 0 && (
        <>
          <span>I don't know</span>
          <ul>
            {unsolved.map((sentence) => (
              <li key={sentence}>{sentence}</li>
            ))}
          </ul>
        </>
      )}
      <Button onClick={onContinue}>Continue</Button>
    </div>
  );
};

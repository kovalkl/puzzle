import { useEffect } from 'react';

import { SentenceAudio } from '@/components/Game/components/SentenceAudio/SentenceAudio';
import { Translation } from '@/components/Game/components/Translation/Translation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsTranslationLoaded } from '@/store/loadingSlice';
import { getSentenceData } from '@/store/selectors';

import styles from '@/components/Game/components/TranslationBlock/TranslationBlock.module.sass';

export const TranslationBlock = () => {
  const translation =
    useAppSelector(getSentenceData)?.textExampleTranslate || '';
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsTranslationLoaded(translation !== ''));
  }, [dispatch, translation]);

  const isLoaded = useAppSelector((state) => state.loading.isLoaded);

  return isLoaded ? (
    <div className={styles.translation}>
      <SentenceAudio />
      <Translation translation={translation} />
    </div>
  ) : null;
};

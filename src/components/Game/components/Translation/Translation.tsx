import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsTranslationLoaded } from '@/store/loadingSlice';
import { getSentenceData } from '@/store/selectors';

export const Translation = () => {
  const isTranslationEnabled = useAppSelector(
    (state) => state.hint.isTranslationEnabled,
  );
  const translation =
    useAppSelector(getSentenceData)?.textExampleTranslate || '';
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsTranslationLoaded(translation !== ''));
  }, [dispatch, translation]);

  return <div>{isTranslationEnabled && translation}</div>;
};

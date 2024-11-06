import { useAppSelector } from '@/store/hooks';
import { getSentenceData } from '@/store/selectors';

export const Translation = () => {
  const isTranslationEnabled = useAppSelector(
    (state) => state.gameStatus.hints.isTranslationEnabled,
  );

  const translation =
    useAppSelector(getSentenceData)?.textExampleTranslate || '';

  return <div>{isTranslationEnabled && translation}</div>;
};

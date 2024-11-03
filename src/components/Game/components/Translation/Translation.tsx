import { useAppSelector } from '@/store/hooks';
import { getTranslation } from '@/store/selectors';

export const Translation = () => {
  const isTranslationEnabled = useAppSelector(
    (state) => state.gameStatus.hints.isTranslationEnabled,
  );

  const translation = useAppSelector(getTranslation);

  return <div>{isTranslationEnabled && translation}</div>;
};

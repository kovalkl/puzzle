import { useAppSelector } from '@/store/hooks';

type TranslationProps = {
  translation: string;
};

export const Translation = ({ translation }: TranslationProps) => {
  const isTranslationEnabled = useAppSelector(
    (state) => state.hint.isTranslationEnabled,
  );

  return <div>{isTranslationEnabled && translation}</div>;
};

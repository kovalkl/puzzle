import { Hint } from '@/components/Game/components/HintsBlock/components/Hint/Hint';
import { ImageSvg } from '@/components/Game/components/HintsBlock/components/ImageSvg';
import { SoundSvg } from '@/components/Game/components/HintsBlock/components/SoundSvg';
import { TranslationSvg } from '@/components/Game/components/HintsBlock/components/TranslationSvg';
import {
  changeAudioHint,
  changeImageHint,
  changeTranslationHint,
} from '@/store/gameStatusSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import styles from '@/components/Game/components/HintsBlock/HintsBlock.module.sass';

export const HintsBlock = () => {
  const { isTranslationEnabled, isImageEnabled, isAudioEnabled } =
    useAppSelector((state) => state.gameStatus.hints);

  const dispatch = useAppDispatch();

  return (
    <div className={styles.hintsBlock}>
      <Hint
        isActive={isTranslationEnabled}
        onClick={() => dispatch(changeTranslationHint())}
      >
        <TranslationSvg />
      </Hint>
      <Hint
        isActive={isImageEnabled}
        onClick={() => dispatch(changeImageHint())}
      >
        <ImageSvg />
      </Hint>
      <Hint
        isActive={isAudioEnabled}
        onClick={() => dispatch(changeAudioHint())}
      >
        <SoundSvg />
      </Hint>
    </div>
  );
};

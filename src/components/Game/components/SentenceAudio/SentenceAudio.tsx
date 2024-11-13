import { useEffect } from 'react';

import { SoundSvg } from '@/components/Game/components/SentenceAudio/SoundSvg';
import { fetchAudio } from '@/store/gameAudioSlice';
import { resetAudioUrl } from '@/store/gameAudioSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getSentenceData } from '@/store/selectors';

import styles from '@/components/Game/components/SentenceAudio/SentenceAudio.module.sass';

export const SentenceAudio = () => {
  const audioExample = useAppSelector(getSentenceData)?.audioExample || '';
  const isAudioEnabled = useAppSelector((state) => state.hint.isAudioEnabled);
  const audioUrl = useAppSelector((state) => state.gameAudio.audioUrl);
  const dispatch = useAppDispatch();

  const onPlayAudio = () => {
    if (!audioUrl) {
      dispatch(fetchAudio({ audioSrc: audioExample })).then((action) => {
        const fetchedAudioUrl = action.payload as string;
        const audio = new Audio(fetchedAudioUrl);
        audio.play();
      });
    } else {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  useEffect(() => {
    dispatch(resetAudioUrl());
  }, [audioExample, dispatch]);

  return (
    isAudioEnabled && (
      <div className={styles.audio} onClick={onPlayAudio}>
        <SoundSvg />
      </div>
    )
  );
};

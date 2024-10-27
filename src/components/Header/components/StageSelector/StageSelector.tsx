import { useEffect } from 'react';

import { Select } from '@/components/Header/components/Select/Select';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchRounds,
  setCurrentLevel,
  setCurrentRound,
} from '@/store/roundSlice';

export const StageSelector = () => {
  const { countRounds, currentRound, currentLevel, rounds } = useAppSelector(
    (state) => state.round,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRounds({ round: currentRound }));
  }, [dispatch, currentRound]);

  return (
    <>
      <Select
        value={currentRound}
        setValue={(round: string) => dispatch(setCurrentRound(round))}
        length={countRounds}
        text='Round'
      />
      <Select
        value={currentLevel}
        setValue={(level: string) => dispatch(setCurrentLevel(level))}
        length={rounds[currentRound]?.roundsCount}
        text='Level'
      />
    </>
  );
};

import { useEffect } from 'react';

import { Select } from '@/components/Header/components/Select/Select';
import { fetchRounds } from '@/store/gameDataSlice';
import {
  setCountLevels,
  setCurrentLevel,
  setCurrentRound,
} from '@/store/gameStatusSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export const StageSelector = () => {
  const {
    levelInfo: { countRounds },
    progress: { currentRound, currentLevel },
  } = useAppSelector((state) => state.gameStatus);
  const { rounds } = useAppSelector((state) => state.gameData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRounds({ round: currentRound }));
  }, [dispatch, currentRound]);

  useEffect(() => {
    if (rounds[currentRound]) {
      dispatch(setCountLevels(rounds[currentRound].roundsCount));
    }
  }, [currentRound, dispatch, rounds]);

  return (
    <>
      <Select
        value={currentRound.toString()}
        setValue={(round: string) => dispatch(setCurrentRound(parseInt(round)))}
        length={countRounds}
        text='Round'
      />
      <Select
        value={currentLevel.toString()}
        setValue={(level: string) => dispatch(setCurrentLevel(parseInt(level)))}
        length={rounds[currentRound]?.roundsCount}
        text='Level'
      />
    </>
  );
};

import { useEffect, useState } from 'react';

import { Select } from '@/components/Header/components/Select/Select';
import { SelectorType } from '@/components/Header/components/types';
import { setDefaultButtons } from '@/store/actionButtonSlice';
import { fetchRounds } from '@/store/gameDataSlice';
import {
  setCountLevels,
  setCurrentLevel,
  setCurrentRound,
} from '@/store/gameStatusSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setIsShowLevelInfo,
  setIsShowResult,
} from '@/store/puzzleInteractionSlice';

export const StageSelector = () => {
  const [currentSelector, setCurrentSelector] = useState<SelectorType | null>(
    null,
  );

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

  useEffect(() => {
    dispatch(setIsShowResult(false));
    dispatch(setIsShowLevelInfo(false));
    dispatch(setDefaultButtons());
  }, [currentRound, currentLevel, dispatch]);

  return (
    <>
      <Select
        value={currentRound.toString()}
        setValue={(round: string) => dispatch(setCurrentRound(parseInt(round)))}
        length={countRounds}
        title='round'
        currentSelector={currentSelector}
        setCurrentSelector={setCurrentSelector}
      />
      <Select
        value={currentLevel.toString()}
        setValue={(level: string) => dispatch(setCurrentLevel(parseInt(level)))}
        length={rounds[currentRound]?.roundsCount}
        title='level'
        currentSelector={currentSelector}
        setCurrentSelector={setCurrentSelector}
      />
    </>
  );
};

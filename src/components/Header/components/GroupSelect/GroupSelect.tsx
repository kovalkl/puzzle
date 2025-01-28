import { useState } from 'react';

import { Select } from '@/components/Header/components/Select/Select';
import { SelectorType } from '@/components/Header/components/types';
import { setCurrentLevel, setCurrentRound } from '@/store/gameStatusSlice';
import { useAppDispatch } from '@/store/hooks';
import { RoundType } from '@/store/types';

type GroupSelectProps = {
  currentRound: number;
  currentLevel: number;
  countRounds: number;
  completedRounds: number[];
  completedLevels: number[];
  rounds: {
    [key: number]: RoundType;
  };
};

export const GroupSelect = ({
  countRounds,
  currentRound,
  currentLevel,
  completedRounds,
  completedLevels,
  rounds,
}: GroupSelectProps) => {
  const [currentSelector, setCurrentSelector] = useState<SelectorType | null>(
    null,
  );

  const dispatch = useAppDispatch();

  return (
    <>
      <Select
        value={currentRound}
        setValue={(round: number) => dispatch(setCurrentRound(round))}
        length={countRounds}
        title='round'
        currentSelector={currentSelector}
        setCurrentSelector={setCurrentSelector}
        completedOptions={completedRounds}
      />
      <Select
        value={currentLevel}
        setValue={(level: number) => dispatch(setCurrentLevel(level))}
        length={rounds[currentRound]?.roundsCount}
        title='level'
        currentSelector={currentSelector}
        setCurrentSelector={setCurrentSelector}
        completedOptions={completedLevels}
      />
    </>
  );
};

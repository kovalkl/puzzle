import { useEffect } from 'react';

import { GroupSelect } from '@/components/Header/components/GroupSelect/GroupSelect';
import { setDefaultButtons } from '@/store/actionButtonSlice';
import { fetchRounds } from '@/store/gameDataSlice';
import { setCountLevels } from '@/store/gameStatusSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setIsShowLevelInfo,
  setIsShowResult,
} from '@/store/puzzleInteractionSlice';
import { setLevelsCount } from '@/store/userProgressSlice';

export const StageSelector = () => {
  const {
    levelInfo: { countRounds },
    progress: { currentRound, currentLevel },
  } = useAppSelector((state) => state.gameStatus);
  const rounds = useAppSelector((state) => state.gameData.rounds);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRounds({ round: currentRound }));
  }, [dispatch, currentRound]);

  useEffect(() => {
    if (rounds[currentRound]) {
      dispatch(setCountLevels(rounds[currentRound].roundsCount));
      dispatch(
        setLevelsCount({
          round: currentRound,
          roundsCount: rounds[currentRound].roundsCount,
        }),
      );
    }
  }, [currentRound, dispatch, rounds, countRounds]);

  useEffect(() => {
    dispatch(setIsShowResult(false));
    dispatch(setIsShowLevelInfo(false));
    dispatch(setDefaultButtons());
  }, [currentRound, currentLevel, dispatch]);

  const completedRounds = useAppSelector(
    (stage) =>
      stage.userProgress.users[stage.userProgress.currentUser!]
        .completedRounds || [],
  );

  const completedLevels = useAppSelector(
    (stage) =>
      stage.userProgress.users[stage.userProgress.currentUser!][currentRound] ||
      [],
  );

  return (
    <GroupSelect
      countRounds={countRounds}
      currentRound={currentRound}
      currentLevel={currentLevel}
      completedLevels={completedLevels}
      completedRounds={completedRounds}
      rounds={rounds}
    />
  );
};

import { RootState } from '@/store';
import { LevelDataType, WordsType } from '@/store/types';
import { createSelector } from '@reduxjs/toolkit';

const getCurrentLevelData = (state: RootState) => {
  const { currentRound, currentLevel } = state.gameStatus.progress;
  const { rounds } = state.gameData;

  const currentRoundData = rounds[currentRound];

  return currentRoundData?.rounds[currentLevel - 1];
};

export const getSentenceData = (state: RootState): WordsType | null => {
  const { currentSentenceCount } = state.gameStatus.progress;
  const currentLevelData = getCurrentLevelData(state);
  return currentLevelData?.words[currentSentenceCount - 1] || null;
};

export const getLevelData = (state: RootState): LevelDataType | null => {
  const currentLevelData = getCurrentLevelData(state);
  return currentLevelData?.levelData || null;
};

export const getSentence = createSelector(
  getSentenceData,
  (sentenceData) => sentenceData?.textExample || '',
);

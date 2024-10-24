export const getRoundAndLevelFromId = (id: string) => {
  const [round, level] = id.split('_');

  return {
    round: parseInt(round),
    level: parseInt(level),
  };
};

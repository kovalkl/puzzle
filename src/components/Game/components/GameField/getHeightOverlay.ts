export const getHeightOverlay = (sentenceNumber: number): string => {
  return `${10 - (sentenceNumber - 1)}0%`;
};

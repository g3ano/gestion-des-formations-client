import { getUnixTime } from 'date-fns';

export const useProgress = (startDate: number, endDate: number) => {
  const now = getUnixTime(new Date());
  const progress = (now - startDate) / (endDate - startDate);

  return progress >= 1 ? 100 : progress < 0 ? 0.05 : Math.round(progress * 100);
};

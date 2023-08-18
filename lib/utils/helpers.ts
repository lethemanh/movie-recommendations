import { MINUTES_PER_HOUR } from "../constants";

export const minutesToHoursAndMinutes = (
  totalMinutes: number | null
):
  | { hours: number; minutes: number; error?: never }
  | { error: string; hours?: never; minutes?: never } => {
  try {
    if (totalMinutes === null) {
      throw new Error("Runtime unavailable");
    }
    const hours = Math.floor(totalMinutes / MINUTES_PER_HOUR);
    const minutes = totalMinutes % MINUTES_PER_HOUR;
    return { hours, minutes };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const convertDollarsToMillions = (amount: number): string => {
  if (amount === 0) {
    return "Budget unavailable";
  }
  return amount / 1000000 + "M";
};

export const getImageLink = (path: string) =>
  `https://image.tmdb.org/t/p/original${path}`;

export const getYoutubeLink = (youtubeKey: string | undefined) =>
  `https://www.youtube.com/embed/${youtubeKey}?controls=0`;

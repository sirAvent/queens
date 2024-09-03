import { boardColors } from "@/constants/constants.board";
export const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const colorToNum = (value: string) => {
  return boardColors.indexOf(value);
};

export const formatTime = (time: number | undefined): string => {
  if (time) {
    const getSeconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const getMinutes = `${Math.floor((time / 60000) % 60)}`.slice(-2);

    return `${getMinutes}:${getSeconds}`;
  }
  return "1:00";
};

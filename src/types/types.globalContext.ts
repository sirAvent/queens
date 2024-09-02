import { Dispatch, SetStateAction } from "react";
import { Cell } from "./types.board";
export interface GlobalState {
  board: Cell[][];
  isWin: boolean;
}

export interface GlobalState {
  board: Cell[][];
  setBoard: Dispatch<SetStateAction<Cell[][]>>;
  isWin: boolean;
  setIsWin: Dispatch<SetStateAction<boolean>>;
}
